import type EventEmitter from 'node:events';
import process, { env } from 'node:process';

const SHARED_RESOURCE_MESSAGE_TYPES = {
  GET_RESOURCE: 'shared_resources_getResource',
  RESOURCE_RESULT: 'shared_resources_resourceResult',
  RESOURCE_NOT_FOUND: 'shared_resources_resourceNotFound',
  RESOURCE_UPDATED: 'shared_resources_resourceUpdated',
  REMOTE_PROCEDURE_CALL: 'shared_resources_remoteProcedureCall',
  REMOTE_PROCEDURE_CALL_RESULT: 'shared_resources_remoteProcedureCallResult',
} as const;

export interface IPCEventEmitter extends EventEmitter {
  send: (message: unknown, ...args: unknown[]) => boolean;
}

type SharedResource = Record<string, unknown>;

type IPCGetMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE;
  name: string;
  id: string;
};

type IPCRemoteProcedureCallMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL;
  name: string;
  id: string;
  method: string;
  args: unknown[];
};

type IPCMessage = IPCGetMessage | IPCRemoteProcedureCallMessage;

type IPCResourceNotFoundMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_NOT_FOUND;
  name: string;
};

type IPCResourceResultMessage<T = unknown> = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT;
  name: string;
  id: string;
  value: T;
  rpcs: MethodsOf<T>[];
};

type IPCResourceUpdatedMessage<T = unknown> = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED;
  name: string;
  value: T;
  rpcs: MethodsOf<T>[];
};

type IPCRemoteProcedureCallResultMessage<T = unknown> = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT;
  id: string;
  value?: T;
  error?: string;
};

type IPCResponse =
  | IPCResourceResultMessage
  | IPCResourceUpdatedMessage
  | IPCRemoteProcedureCallResultMessage;

type RPCResult<TResult, TResource> = {
  result: TResult;
  latest: TResource;
};

export interface SharedResourceEntry<T = unknown> {
  state: T;
  subscribers: Set<(state: T) => void>;
}

type MethodsToRPC<T> = {
  // biome-ignore lint/suspicious/noExplicitAny: testing for function extensions
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? (
        ...args: Parameters<T[K]>
      ) => ReturnType<T[K]> extends Promise<unknown>
        ? ReturnType<T[K]>
        : Promise<ReturnType<T[K]>>
    : T[K];
};

type MethodsOf<T> = {
  // biome-ignore lint/suspicious/noExplicitAny: testing for function extensions
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type ArgumentsOf<T> =
  T extends MethodsOf<infer U>
    ? U extends (...args: infer P) => unknown
      ? P & { length: number }
      : never
    : never;

type ReturnTypeOf<T> =
  T extends MethodsOf<infer U>
    ? U extends (...args: unknown[]) => infer R
      ? R
      : never
    : never;

function assertSharedResourcesActive() {
  if (env.POKU_SHARED_RESOURCES !== 'true') {
    throw new Error(
      'Shared resources are not enabled. Please enable them in your configuration.'
    );
  }
}

export async function createSharedResource<T>(
  name: string,
  factory: () => T | Promise<T>
): Promise<{ entry: SharedResourceEntry<T>; name: string }> {
  const state = await factory();
  const entry: SharedResourceEntry<T> = {
    state,
    subscribers: new Set<(state: T) => void>(),
  };

  return { entry, name };
}

export async function remoteProcedureCall<
  TResource,
  TMethod extends MethodsOf<TResource>,
  TResult = ReturnTypeOf<TResource[TMethod]>,
>(
  name: string,
  method: TMethod,
  ...args: ArgumentsOf<TResource[TMethod]>
): Promise<RPCResult<TResult, TResource>> {
  assertSharedResourcesActive();
  return new Promise((resolve, reject) => {
    const requestId = `${name}-${String(method)}-${Date.now()}-${Math.random()}`;

    function handleResponse(
      message: IPCRemoteProcedureCallResultMessage<
        ReturnTypeOf<TResource[TMethod]>
      >
    ) {
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
      id: requestId,
      method: String(method),
      args,
    } as unknown as IPCRemoteProcedureCallMessage);

    setTimeout(() => {
      process.off('message', handleResponse);
      reject(
        new Error(
          `Timeout waiting for remote procedure call "${name}.${String(method)}"`
        )
      );
    }, 5000);
  });
}

export function extractFunctionNames<T extends Record<string, unknown>>(
  obj: T
) {
  return Object.keys(obj).filter(
    (key) => typeof obj[key] === 'function'
  ) as MethodsOf<T>[];
}

export function setupSharedResourceIPC<T>(
  child: IPCEventEmitter,
  registry: Record<string, SharedResourceEntry<T>>
): void {
  child.on('message', async (message: IPCMessage) => {
    if (!message || typeof message.type !== 'string') return;
    switch (message.type) {
      case SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE: {
        const entry = registry[message.name];

        if (!entry) {
          child.send({
            type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_NOT_FOUND,
            name: message.name,
          } as IPCResourceNotFoundMessage);
          return;
        }

        child.send({
          type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
          name: message.name,
          value: entry.state,
          rpcs: extractFunctionNames(entry.state as SharedResource),
          id: message.id,
        } as IPCResourceResultMessage<T>);

        child.send({
          type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED,
          name: message.name,
          value: entry.state,
          rpcs: extractFunctionNames(entry.state as SharedResource),
        } as IPCResourceUpdatedMessage<T>);

        function cb(state: unknown) {
          child.send({
            type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED,
            name: message.name,
            value: state,
            rpcs: extractFunctionNames(state as SharedResource),
          } as IPCResourceUpdatedMessage<T>);
        }

        entry.subscribers.add(cb);
        const cleanup = () => entry.subscribers.delete(cb);
        child.once('exit', cleanup);
        child.once('disconnect', cleanup);

        break;
      }

      case SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL: {
        const entry = registry[message.name];
        if (!entry) return;

        const methodKey = message.method as MethodsOf<typeof entry.state>;
        if (!methodKey) return;

        const method = entry.state[methodKey];
        if (typeof method !== 'function') return;

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

        break;
      }
      default:
        break;
    }
  });
}

function functionToRPC<T extends SharedResource, K extends MethodsOf<T>>(
  resource: T,
  key: K,
  name: string
) {
  return async (...args: ArgumentsOf<T[K]>) => {
    const rpcResult = await remoteProcedureCall<T, K>(name, key, ...args);
    Object.assign(resource, rpcResult.latest);
    return rpcResult.result;
  };
}

export function constructSharedResourceWithRPCs<T extends SharedResource>(
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

export function getSharedResource<T extends SharedResource>(
  name: string
): Promise<MethodsToRPC<T>> {
  assertSharedResourcesActive();

  return new Promise((resolve, reject) => {
    const requestId = `${name}-${Date.now()}-${Math.random()}`;
    let resourceProxy: MethodsToRPC<T> = Object.create(null);
    let resolved = false;

    function handleResponse(
      response: IPCResourceResultMessage<T> | IPCResourceUpdatedMessage<T>
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
        resolve(resourceProxy);
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

    process.on('message', handleResponse);

    process.send!({
      type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
      name,
      id: requestId,
    } as IPCGetMessage);

    setTimeout(() => {
      process.off('message', handleResponse);
      if (!resolved) {
        reject(new Error(`Timeout waiting for shared resource "${name}"`));
      }
    }, 5000);
  });
}
