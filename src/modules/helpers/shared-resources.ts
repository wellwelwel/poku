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

export const SHARED_RESOURCE_MESSAGE_TYPES = {
  GET_RESOURCE: 'shared_resources_getResource',
  RESOURCE_RESULT: 'shared_resources_resourceResult',
  RESOURCE_NOT_FOUND: 'shared_resources_resourceNotFound',
  RESOURCE_UPDATED: 'shared_resources_resourceUpdated',
  REMOTE_PROCEDURE_CALL: 'shared_resources_remoteProcedureCall',
  REMOTE_PROCEDURE_CALL_RESULT: 'shared_resources_remoteProcedureCallResult',
} as const;

export function assertSharedResourcesActive() {
  if (env.POKU_SHARED_RESOURCES !== 'true') {
    throw new Error(
      'Shared resources are not enabled. Please enable them in your configuration.'
    );
  }
}

export async function createSharedResource<T>(
  name: string,
  factory: () => T | Promise<T>,
  cleanup?: Cleanup<T>
): Promise<{
  entry: SharedResourceEntry<T>;
  name: string;
  cleanup?: Cleanup<T>;
}> {
  const state = await factory();
  const entry: SharedResourceEntry<T> = {
    state,
    subscribers: new Set<(state: T) => void>(),
  };

  return { entry, name, cleanup };
}

export async function remoteProcedureCall<
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
): Promise<RPCResult<TResult, TResource>> {
  assertSharedResourcesActive();
  const requestId = `${name}-${String(method)}-${Date.now()}-${Math.random()}`;

  return new Promise((resolve, reject) => {
    function handleResponse(message: TMessage) {
      if (message.id !== requestId) {
        return;
      }

      process.off('message', handleResponse);

      if (message.error) {
        reject(new Error(message.error));
      } else {
        resolve(message.value!);
      }
    }

    process.on('message', handleResponse);

    process.send!({
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
      name,
      method,
      args,
      id: requestId,
    } as IPCRemoteProcedureCallMessage);
  });
}

export function extractFunctionNames<T extends Record<string, unknown>>(
  obj: T
) {
  const seen = new Set<string>();
  let current = obj;

  while (
    current !== Object.prototype &&
    Object.getPrototypeOf(current) !== null
  ) {
    for (const key of Object.getOwnPropertyNames(current)) {
      if (typeof obj[key] !== 'function' || key === 'constructor') {
        continue;
      }

      seen.add(key);
    }

    current = Object.getPrototypeOf(current);
  }

  return Array.from(seen) as MethodsOf<T>[];
}

export function setupSharedResourceIPC<T>(
  child: IPCEventEmitter | ChildProcess,
  registry: Record<string, SharedResourceEntry<T>>
): void {
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
}

export async function handleGetResource<T>(
  message: IPCGetMessage,
  registry: Record<string, SharedResourceEntry<T>>,
  child: IPCEventEmitter | ChildProcess
) {
  const entry = registry[message.name];

  if (!entry) {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_NOT_FOUND,
      name: message.name,
    } as IPCResourceNotFoundMessage);
    return;
  }

  const rpcs = extractFunctionNames(entry.state as SharedResource);

  child.send({
    type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
    name: message.name,
    value: entry.state,
    rpcs,
    id: message.id,
  } as IPCResourceResultMessage<T>);

  function subscriber(state: unknown) {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED,
      name: message.name,
      value: state,
      rpcs,
    } as IPCResourceUpdatedMessage<T>);
  }

  entry.subscribers.add(subscriber);
  const cleanup = () => entry.subscribers.delete(subscriber);
  child.once('exit', cleanup);
  child.once('disconnect', cleanup);
}

export async function handleRemoteProcedureCall<T>(
  message: IPCRemoteProcedureCallMessage,
  registry: Record<string, SharedResourceEntry<T>>,
  child: IPCEventEmitter | ChildProcess
) {
  const entry = registry[message.name];

  if (!entry) return;

  const methodKey = message.method as MethodsOf<typeof entry.state>;
  if (!methodKey) return;

  const methodCandidate = entry.state[methodKey];
  if (typeof methodCandidate !== 'function') return;

  const method = methodCandidate.bind(entry.state);
  const result = await method(...(message.args || []));

  for (const subscriber of entry.subscribers) {
    subscriber(entry.state);
  }

  child.send({
    type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
    id: message.id,
    value: {
      result,
      latest: entry.state,
    },
  } as IPCResponse);
}

function functionToRPC<T extends object, K extends MethodsOf<T>>(
  resource: T,
  key: K,
  name: string
) {
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
}

export function constructSharedResourceWithRPCs<T extends object>(
  resource: T,
  rpcs: MethodsOf<T>[],
  name: string
): MethodsToRPC<T> {
  if (rpcs.length === 0) {
    return resource as MethodsToRPC<T>;
  }

  for (const key of rpcs) {
    Object.assign(resource, { [key]: functionToRPC(resource, key, name) });
  }

  return resource as MethodsToRPC<T>;
}

export function getSharedResource<
  T extends SharedResource,
  TResult extends IPCListenable<T> = IPCListenable<T>,
>(name: string): Promise<[MethodsToRPC<T>, () => void]> {
  assertSharedResourcesActive();

  let resourceProxy = Object.create(null) as MethodsToRPC<T>;

  let resolved = false;
  const requestId = `${name}-${Date.now()}-${Math.random()}`;

  function handleResponse(
    response: TResult,
    callback: (value: MethodsToRPC<T>) => void
  ) {
    if (
      response.type === SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT &&
      response.id === requestId &&
      !resolved
    ) {
      resourceProxy = constructSharedResourceWithRPCs<T>(
        response.value as T,
        response.rpcs as MethodsOf<T>[],
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
        constructSharedResourceWithRPCs<T>(
          response.value as T,
          response.rpcs as MethodsOf<T>[],
          name
        )
      );
    }
  }

  return new Promise<[MethodsToRPC<T>, () => void]>((resolve) => {
    function handleResponseWrapper(message: unknown) {
      handleResponse(message as TResult, (value) => {
        resolve([
          value,
          function detach() {
            process.removeListener('message', handleResponseWrapper);
          },
        ]);
      });
    }

    process.on('message', handleResponseWrapper);

    process.send!({
      type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
      name,
      id: requestId,
    });
  });
}
