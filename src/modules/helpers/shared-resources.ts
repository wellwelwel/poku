import type { ChildProcess } from 'node:child_process';
import type {
  ArgumentsOf,
  IPCEventEmitter,
  IPCGetMessage,
  IPCListenable,
  IPCMessage,
  IPCRegisterMessage,
  IPCRemoteProcedureCallMessage,
  IPCRemoteProcedureCallResultMessage,
  IPCResourceNotFoundMessage,
  IPCResourceResultMessage,
  IPCResourceUpdatedMessage,
  IPCResponse,
  MethodsOf,
  MethodsToRPC,
  ResourceContext,
  ReturnTypeOf,
  RPCResult,
  SharedResource,
  SharedResourceEntry,
} from '../../@types/shared-resources.js';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process, { env } from 'node:process';
import { pathToFileURL } from 'node:url';
import { findFile } from '../../parsers/find-file-from-process-arguments.js';
import { parseImports } from '../../parsers/imports.js';

export const SHARED_RESOURCE_MESSAGE_TYPES = {
  REGISTER: 'shared_resources_register',
  GET_RESOURCE: 'shared_resources_getResource',
  RESOURCE_RESULT: 'shared_resources_resourceResult',
  RESOURCE_NOT_FOUND: 'shared_resources_resourceNotFound',
  RESOURCE_UPDATED: 'shared_resources_resourceUpdated',
  REMOTE_PROCEDURE_CALL: 'shared_resources_remoteProcedureCall',
  REMOTE_PROCEDURE_CALL_RESULT: 'shared_resources_remoteProcedureCallResult',
} as const;

export const assertSharedResourcesActive = () => {
  if (env.POKU_SHARED_RESOURCES !== '1') {
    throw new Error(
      'Shared resources are not enabled. Please enable them in your configuration.'
    );
  }
};

export const globalRegistry: Record<string, SharedResourceEntry<unknown>> = {};

export const clearGlobalRegistry = () => {
  for (const key in globalRegistry) {
    if (Object.prototype.hasOwnProperty.call(globalRegistry, key)) {
      delete globalRegistry[key];
    }
  }
};

export const shared = async <T>(
  context: ResourceContext<T>
): Promise<MethodsToRPC<T>> => {
  const { name } = context;

  // Parent Process (Host)
  if (!process.env.POKU_TEST) {
    if (globalRegistry[name]) {
      return globalRegistry[name].state as MethodsToRPC<T>;
    }

    const state = await context.factory();
    globalRegistry[name] = {
      state,
      subscribers: new Set(),
      cleanup: context.cleanup as
        | ((instance: unknown) => void | Promise<void>)
        | undefined,
    };

    return state as MethodsToRPC<T>;
  }

  const filePath = findFile();

  // Child Process (Test)
  assertSharedResourcesActive();

  process.send!({
    type: SHARED_RESOURCE_MESSAGE_TYPES.REGISTER,
    name,
    filePath,
  } satisfies IPCRegisterMessage);

  return getRemoteResource(name) as unknown as MethodsToRPC<T>;
};

let activeRequests = 0;

const trackRequestStart = () => {
  activeRequests++;
  process.channel?.ref?.();
};

const trackRequestEnd = () => {
  activeRequests--;
  if (activeRequests === 0) {
    process.channel?.unref?.();
  }
};

const getRemoteResource = <
  T extends SharedResource,
  TResult extends IPCListenable<T> = IPCListenable<T>,
>(
  name: string
): Promise<MethodsToRPC<T>> => {
  let resourceProxy: MethodsToRPC<T> = Object.create(null);
  let resolved = false;

  const requestId = `${name}-${Date.now()}-${Math.random()}`;

  const handleResponse = (
    response: TResult,
    callback: (value: MethodsToRPC<T>) => void
  ) => {
    if (
      response.type === SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT &&
      response.id === requestId &&
      !resolved
    ) {
      resourceProxy = constructSharedResourceWithRPCs(
        response.value,
        response.rpcs,
        name
      );

      resolved = true;
      callback(resourceProxy);
      return;
    }

    if (
      response.type === SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED &&
      response.name === name &&
      resourceProxy
    ) {
      Object.assign(
        resourceProxy,
        constructSharedResourceWithRPCs(response.value, response.rpcs, name)
      );
    }

    const msg = response as unknown as IPCResourceNotFoundMessage;

    if (
      msg.type === SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_NOT_FOUND &&
      msg.name === name
    ) {
      setTimeout(() => {
        process.send?.({
          type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
          name,
          id: requestId,
        } satisfies IPCGetMessage);
      }, 50);
      return;
    }
  };

  return new Promise<MethodsToRPC<T>>((resolve) => {
    trackRequestStart();

    const handleResponseWrapper = (message: TResult) => {
      handleResponse(message, (value) => {
        resolve(value);
        trackRequestEnd();
      });
    };

    process.on('message', handleResponseWrapper);

    process.send?.({
      type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
      name,
      id: requestId,
    } satisfies IPCGetMessage);
  });
};

export const remoteProcedureCall = <
  TResource,
  TMethod extends MethodsOf<TResource>,
  TMessage extends IPCRemoteProcedureCallResultMessage<
    ReturnTypeOf<TResource[TMethod]>
  > = IPCRemoteProcedureCallResultMessage<ReturnTypeOf<TResource[TMethod]>>,
  TResult = ReturnTypeOf<TResource[TMethod]>,
>(
  name: string,
  method: TMethod,
  ...args: ArgumentsOf<TResource[TMethod]>
): Promise<RPCResult<TResult, TResource>> => {
  assertSharedResourcesActive();
  const requestId = `${name}-${String(method)}-${Date.now()}-${Math.random()}`;

  return new Promise((resolve, reject) => {
    trackRequestStart();

    const handleResponse = (message: TMessage) => {
      if (message.id !== requestId) {
        return;
      }

      process.off('message', handleResponse);
      trackRequestEnd();

      if (message.error) reject(new Error(message.error));
      else resolve(message.value!);
    };

    process.on('message', handleResponse);

    process.send?.({
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
      name,
      method,
      args,
      id: requestId,
    } satisfies IPCRemoteProcedureCallMessage);
  });
};

export const extractFunctionNames = <T extends Record<string, unknown>>(
  obj: T
) => {
  const seen = new Set<string>();
  let current = obj;

  while (
    current !== Object.prototype &&
    Object.getPrototypeOf(current) !== null
  ) {
    for (const key of Object.getOwnPropertyNames(current)) {
      if (typeof obj[key] !== 'function' || key === 'constructor') continue;

      seen.add(key);
    }

    current = Object.getPrototypeOf(current);
  }

  return Array.from(seen) as MethodsOf<T>[];
};

export const setupSharedResourceIPC = (
  child: IPCEventEmitter | ChildProcess,
  registry: Record<string, SharedResourceEntry<unknown>> = globalRegistry
): void => {
  child.on('message', async (message: IPCMessage) => {
    switch (message.type) {
      case SHARED_RESOURCE_MESSAGE_TYPES.REGISTER: {
        await handleRegister(message, registry);
        break;
      }
      case SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE: {
        await handleGetResource(message, registry, child);
        break;
      }

      case SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL: {
        await handleRemoteProcedureCall(message, registry, child);
        break;
      }

      default:
        break;
    }
  });
};

export const handleRegister = async (
  message: IPCRegisterMessage,
  registry: Record<string, SharedResourceEntry<unknown>>
) => {
  if (registry[message.name]) return;

  const content = readFileSync(message.filePath, 'utf-8');
  const imports = parseImports(content);
  const dir = dirname(message.filePath);

  for (const imp of imports) {
    let targetUrl: string;

    if (imp.module.startsWith('.')) {
      const absolutePath = resolve(dir, imp.module);
      targetUrl = pathToFileURL(absolutePath).href;
    } else if (imp.module.startsWith('/')) {
      targetUrl = pathToFileURL(imp.module).href;
    } else {
      targetUrl = imp.module;
    }

    const module = await import(targetUrl);

    for (const key in module) {
      if (Object.prototype.hasOwnProperty.call(module, key)) {
        const exported = module[key];
        if (
          exported &&
          typeof exported === 'object' &&
          exported.name === message.name &&
          typeof exported.factory === 'function'
        ) {
          await shared(exported);
          return;
        }
      }
    }
  }
};

export const handleGetResource = async (
  message: IPCGetMessage,
  registry: Record<string, SharedResourceEntry<unknown>>,
  child: IPCEventEmitter | ChildProcess
) => {
  const entry = registry[message.name];
  if (!entry) {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_NOT_FOUND,
      name: message.name,
    } satisfies IPCResourceNotFoundMessage);
    return;
  }

  const rpcs = extractFunctionNames(entry.state as SharedResource);

  child.send({
    type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
    name: message.name,
    value: entry.state,
    rpcs,
    id: message.id,
  } satisfies IPCResourceResultMessage<unknown>);

  const subscriber = (state: unknown) => {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED,
      name: message.name,
      value: state,
      rpcs,
    } satisfies IPCResourceUpdatedMessage<unknown>);
  };

  entry.subscribers.add(subscriber);
  const cleanup = () => entry.subscribers.delete(subscriber);
  child.once('exit', cleanup);
  child.once('disconnect', cleanup);
};

export const handleRemoteProcedureCall = async (
  message: IPCRemoteProcedureCallMessage,
  registry: Record<string, SharedResourceEntry<unknown>>,
  child: IPCEventEmitter | ChildProcess
) => {
  const entry = registry[message.name];
  if (!entry) return;

  const methodKey = message.method as MethodsOf<typeof entry.state>;
  if (!methodKey) return;

  const methodCandidate = (entry.state as Record<string, unknown>)[
    methodKey as string
  ];
  if (typeof methodCandidate !== 'function') return;

  const method = methodCandidate.bind(entry.state);
  const result = await method(...(message.args || []));

  for (const subscriber of entry.subscribers) subscriber(entry.state);

  child.send({
    type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
    id: message.id,
    value: {
      result,
      latest: entry.state,
    },
  } satisfies IPCResponse);
};

const functionToRPC = <T extends object, K extends MethodsOf<T>>(
  resource: T,
  key: K,
  name: string
) => {
  return async (...args: ArgumentsOf<T[K]>) => {
    const rpcResult = await remoteProcedureCall<T, K>(name, key, ...args);
    if (!rpcResult) {
      throw new Error(
        `Failed to call remote procedure ${String(key)} on resource ${name}`
      );
    }

    Object.assign(resource, rpcResult.latest);
    return rpcResult.result;
  };
};

export const constructSharedResourceWithRPCs = <T extends SharedResource>(
  resource: T,
  rpcs: MethodsOf<T>[],
  name: string
): MethodsToRPC<T> => {
  if (rpcs.length === 0) return resource as MethodsToRPC<T>;

  for (const key of rpcs)
    Object.assign(resource, { [key]: functionToRPC(resource, key, name) });

  return resource as MethodsToRPC<T>;
};
