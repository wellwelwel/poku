import type { ChildProcess } from 'node:child_process';
import type {
  ArgumentsOf,
  IPCEventEmitter,
  IPCMessage,
  IPCRemoteProcedureCallMessage,
  IPCRemoteProcedureCallResultMessage,
  IPCRequestResourceMessage,
  IPCResourceResultMessage,
  IPCResponse,
  MethodsOf,
  MethodsToRPC,
  ResourceContext,
  ReturnTypeOf,
  RPCResult,
  SharedResource,
  SharedResourceEntry,
} from '../../@types/shared-resources.js';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process, { env } from 'node:process';
import { pathToFileURL } from 'node:url';
import { findFile } from '../../parsers/find-file-from-process-arguments.js';
import { parseImports } from '../../parsers/imports.js';

export const SHARED_RESOURCE_MESSAGE_TYPES = {
  REQUEST_RESOURCE: 'shared_resources_requestResource',
  RESOURCE_RESULT: 'shared_resources_resourceResult',
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

let isRegistering = false;

export const shared = async <T>(
  context: ResourceContext<T>
): Promise<MethodsToRPC<T>> => {
  const { name } = context;

  // Parent Process (Host)
  if (!process.send || isRegistering) {
    if (globalRegistry[name]) {
      return globalRegistry[name].state as MethodsToRPC<T>;
    }

    const state = await context.factory();
    globalRegistry[name] = {
      state,
      cleanup: context.cleanup as
        | ((instance: unknown) => void | Promise<void>)
        | undefined,
    };

    return state as MethodsToRPC<T>;
  }

  const filePath = findFile();

  // Child Process (Test)
  assertSharedResourcesActive();

  return requestResource(name, filePath) as unknown as MethodsToRPC<T>;
};

const requestResource = <
  T extends SharedResource,
  TResult extends IPCResourceResultMessage<T> = IPCResourceResultMessage<T>,
>(
  name: string,
  filePath: string
): Promise<MethodsToRPC<T>> => {
  const requestId = `${name}-${Date.now()}-${Math.random()}`;

  return new Promise<MethodsToRPC<T>>((resolve, reject) => {
    const timeout = setTimeout(() => {
      process.off('message', handleResponse);
      reject(new Error(`Timeout: Failed to get resource "${name}"`));
    }, 10000);

    const handleResponse = (message: TResult) => {
      if (
        message.type === SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT &&
        message.id === requestId
      ) {
        clearTimeout(timeout);
        process.off('message', handleResponse);

        const resourceProxy = constructSharedResourceWithRPCs(
          message.value,
          message.rpcs,
          name
        );

        resolve(resourceProxy);
      }
    };

    process.on('message', handleResponse);

    try {
      process.send?.({
        type: SHARED_RESOURCE_MESSAGE_TYPES.REQUEST_RESOURCE,
        name,
        filePath,
        id: requestId,
      });
    } catch (error) {
      clearTimeout(timeout);
      process.off('message', handleResponse);
      reject(error);
    }
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
    const timeout = setTimeout(() => {
      process.off('message', handleResponse);
      reject(
        new Error(`Timeout: RPC call "${String(method)}" on "${name}" failed`)
      );
    }, 10000);

    const handleResponse = (message: TMessage) => {
      if (message.id !== requestId) {
        return;
      }

      clearTimeout(timeout);
      process.off('message', handleResponse);

      if (message.error) reject(new Error(message.error));
      else resolve(message.value!);
    };

    process.on('message', handleResponse);

    try {
      process.send?.({
        type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
        name,
        method,
        args,
        id: requestId,
      } satisfies IPCRemoteProcedureCallMessage);
    } catch (error) {
      clearTimeout(timeout);
      process.off('message', handleResponse);
      reject(error);
    }
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
      case SHARED_RESOURCE_MESSAGE_TYPES.REQUEST_RESOURCE: {
        await handleRequestResource(message, registry, child);
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

export const handleRequestResource = async (
  message: IPCRequestResourceMessage,
  registry: Record<string, SharedResourceEntry<unknown>>,
  child: IPCEventEmitter | ChildProcess
) => {
  if (!registry[message.name]) {
    isRegistering = true;

    try {
      const content = await readFile(message.filePath, 'utf-8');
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
              break;
            }
          }
        }
      }
    } catch {
      //
    } finally {
      isRegistering = false;
    }
  }

  const entry = registry[message.name];
  if (!entry) {
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
};

export const handleRemoteProcedureCall = async (
  message: IPCRemoteProcedureCallMessage,
  registry: Record<string, SharedResourceEntry<unknown>>,
  child: IPCEventEmitter | ChildProcess
) => {
  const entry = registry[message.name];
  if (!entry) {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
      id: message.id,
      error: `Resource "${message.name}" not found`,
    } satisfies IPCResponse);
    return;
  }

  const methodKey = message.method as MethodsOf<typeof entry.state>;
  if (!methodKey) {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
      id: message.id,
      error: 'Method name is missing',
    } satisfies IPCResponse);
    return;
  }

  const methodCandidate = (entry.state as Record<string, unknown>)[
    methodKey as string
  ];
  if (typeof methodCandidate !== 'function') {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
      id: message.id,
      error: `Method "${String(methodKey)}" not found on resource "${message.name}"`,
    } satisfies IPCResponse);
    return;
  }

  try {
    const method = methodCandidate.bind(entry.state);
    const result = await method(...(message.args || []));

    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
      id: message.id,
      value: {
        result,
        latest: entry.state,
      },
    } satisfies IPCResponse);
  } catch (error) {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
      id: message.id,
      error: error instanceof Error ? error.message : String(error),
    } satisfies IPCResponse);
  }
};

const functionToRPC = <T extends object, K extends MethodsOf<T>>(
  resource: T,
  rpcs: MethodsOf<T>[],
  key: K,
  name: string
) => {
  return async (...args: ArgumentsOf<T[K]>): Promise<ReturnTypeOf<T[K]>> => {
    const rpcResult = await remoteProcedureCall<T, K>(name, key, ...args);
    if (!rpcResult) {
      throw new Error(
        `Failed to call remote procedure ${String(key)} on resource ${name}`
      );
    }

    // if rpcResult.latest has keys to any rpc, we should remove it to avoid overwriting the function
    for (const rpcKey of rpcs) {
      if (rpcKey in rpcResult.latest) {
        // inefficient, should be optimized later
        delete rpcResult.latest[rpcKey];
      }
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
    Object.assign(resource, {
      [key]: functionToRPC(resource, rpcs, key, name),
    });

  return resource as MethodsToRPC<T>;
};
