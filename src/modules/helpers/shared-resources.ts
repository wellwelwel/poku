import type { ChildProcess } from 'node:child_process';
import type {
  ArgumentsOf,
  Cleanup,
  IPCEventEmitter,
  IPCGetMessage,
  IPCListenable,
  IPCMessage,
  IPCRemoteProcedureCallMessage,
  IPCRemoteProcedureCallResultMessage,
  IPCResourceNotFoundMessage,
  IPCResourceResultMessage,
  IPCResourceUpdatedMessage,
  IPCResponse,
  MethodsOf,
  MethodsToRPC,
  ReturnTypeOf,
  RPCResult,
  SharedResource,
  SharedResourceEntry,
} from '../../@types/shared-resources.js';
import process, { env } from 'node:process';
import { serialize } from '../../parsers/output.js';

export const SHARED_RESOURCE_MESSAGE_TYPES = {
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

export const createSharedResource = async <T>(
  name: string,
  factory: () => T | Promise<T>,
  cleanup?: Cleanup<T>
): Promise<{
  entry: SharedResourceEntry<T>;
  name: string;
  cleanup?: Cleanup<T>;
}> => {
  const state = await factory();
  const entry: SharedResourceEntry<T> = {
    state,
    subscribers: new Set<(state: T) => void>(),
  };

  return { entry, name, cleanup };
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
    const handleResponse = (message: TMessage) => {
      if (message.id !== requestId) {
        return;
      }

      process.off('message', handleResponse);

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

export const setupSharedResourceIPC = <T>(
  child: IPCEventEmitter | ChildProcess,
  registry?: Record<string, SharedResourceEntry<T>>
): void => {
  if (!registry) return;

  child.on('message', async (message: IPCMessage) => {
    switch (message.type) {
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

const hasIPCChannel = (child: IPCEventEmitter | ChildProcess): boolean =>
  'channel' in child || '_channel' in child;

const serializeState = (state: unknown, hasChannel: boolean) =>
  hasChannel ? serialize(state) : state;

export const handleGetResource = async <T>(
  message: IPCGetMessage,
  registry: Record<string, SharedResourceEntry<T>>,
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
  const useIPC = hasIPCChannel(child);

  child.send({
    type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
    name: message.name,
    value: serializeState(entry.state, useIPC) as T,
    rpcs,
    id: message.id,
  } satisfies IPCResourceResultMessage<T>);

  const subscriber = (state: T) => {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED,
      name: message.name,
      value: serializeState(state, useIPC) as T,
      rpcs,
    } satisfies IPCResourceUpdatedMessage<T>);
  };

  entry.subscribers.add(subscriber);
  const cleanup = () => entry.subscribers.delete(subscriber);
  child.once('exit', cleanup);
  child.once('disconnect', cleanup);
};

export const handleRemoteProcedureCall = async <T>(
  message: IPCRemoteProcedureCallMessage,
  registry: Record<string, SharedResourceEntry<T>>,
  child: IPCEventEmitter | ChildProcess
) => {
  const entry = registry[message.name];
  if (!entry) return;

  const methodKey = message.method as MethodsOf<typeof entry.state>;
  if (!methodKey) return;

  const methodCandidate = entry.state[methodKey];
  if (typeof methodCandidate !== 'function') return;

  const useIPC = hasIPCChannel(child);
  const method = methodCandidate.bind(entry.state);
  const result = await method(...(message.args || []));

  for (const subscriber of entry.subscribers) subscriber(entry.state);

  child.send({
    type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
    id: message.id,
    value: {
      result,
      latest: serializeState(entry.state, useIPC),
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

export const constructSharedResourceWithRPCs = <T extends object>(
  resource: T,
  rpcs: MethodsOf<T>[],
  name: string
): MethodsToRPC<T> => {
  if (rpcs.length === 0) return resource as MethodsToRPC<T>;

  for (const key of rpcs)
    Object.assign(resource, { [key]: functionToRPC(resource, key, name) });

  return resource as MethodsToRPC<T>;
};

export const getSharedResource = <
  T extends SharedResource,
  TResult extends IPCListenable<T> = IPCListenable<T>,
>(
  name: string
): Promise<[MethodsToRPC<T>, () => void]> => {
  assertSharedResourcesActive();

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
        response.value as T,
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
        constructSharedResourceWithRPCs(
          response.value as T,
          response.rpcs,
          name
        )
      );
    }
  };

  return new Promise<[MethodsToRPC<T>, () => void]>((resolve) => {
    const handleResponseWrapper = (message: unknown) => {
      handleResponse(message as TResult, (value) => {
        resolve([
          value,
          () => {
            process.removeListener('message', handleResponseWrapper);
          },
        ]);
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
