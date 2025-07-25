import type EventEmitter from 'node:events';
import { GLOBAL } from '../../configs/poku.js';

const SHARED_RESOURCE_MESSAGE_TYPES = {
  GET_RESOURCE: 'shared_resources_getResource',
  RESOURCE_RESULT: 'shared_resources_resourceResult',
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

type IPCResourceResultMessage<T = unknown> = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT;
  name: string;
  id: string;
  value: T;
  rpcs: string[];
};

type IPCResourceUpdatedMessage<T = unknown> = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED;
  name: string;
  value: T;
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

export interface SharedResourceEntry<T = unknown> {
  state: T;
  subscribers: Set<(state: T) => void>;
}

type MethodsToRPC<T> = {
  // biome-ignore lint/suspicious/noExplicitAny: any
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? (
        ...args: Parameters<T[K]>
      ) => ReturnType<T[K]> extends Promise<unknown>
        ? ReturnType<T[K]>
        : Promise<ReturnType<T[K]>>
    : T[K];
};

type MethodsOf<T> = {
  // biome-ignore lint/suspicious/noExplicitAny: any
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
  if (!GLOBAL.configs.sharedResources) {
    throw new Error(
      'Shared resources are not enabled. Please enable them in your configuration.'
    );
  }
}

export function createSharedResource<T>(
  name: string,
  factory: () => T
): { entry: SharedResourceEntry<T>; name: string } {
  assertSharedResourcesActive();
  const entry: SharedResourceEntry<T> = {
    state: factory(),
    subscribers: new Set<(state: T) => void>(),
  };
  return { entry, name };
}

export function remoteProcedureCallFactory(
  proc: IPCEventEmitter = process as IPCEventEmitter
) {
  return async function remoteProcedureCall<
    TResource,
    TMethod extends MethodsOf<TResource>,
    TResult = ReturnTypeOf<TResource[TMethod]>,
  >(
    name: string,
    method: TMethod,
    ...args: ArgumentsOf<TResource[TMethod]>
  ): Promise<{
    result: TResult;
    latest: TResource;
  }> {
    assertSharedResourcesActive();
    return new Promise((resolve, reject) => {
      const requestId = `${name}-${String(method)}-${Date.now()}-${Math.random()}`;

      const responseHandler = (
        message: IPCRemoteProcedureCallResultMessage<
          ReturnTypeOf<TResource[TMethod]>
        >
      ) => {
        if (
          message.type ===
            SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT &&
          message.id === requestId
        ) {
          proc.off('message', responseHandler);
          if (message.error) {
            reject(new Error(message.error));
          } else {
            resolve(message.value!);
          }
        }
      };

      proc.on('message', responseHandler);

      proc.send!({
        type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
        name,
        id: requestId,
        method: String(method),
        args,
      } as unknown as IPCRemoteProcedureCallMessage);

      setTimeout(() => {
        proc.off('message', responseHandler);
        reject(
          new Error(
            `Timeout waiting for remote procedure call "${name}.${String(method)}"`
          )
        );
      }, 5000);
    });
  };
}

export function extractFunctionNames<T extends Record<string, unknown>>(
  obj: T
): MethodsOf<T>[] {
  return Object.keys(obj).filter(
    (key) => typeof obj[key] === 'function'
  ) as MethodsOf<T>[];
}

export function setupSharedResourceIPC<T>(
  child: IPCEventEmitter,
  registry: Record<string, SharedResourceEntry<T>>
): void {
  assertSharedResourcesActive();
  child.on('message', async (message: IPCMessage) => {
    if (!message || typeof message.type !== 'string') return;
    switch (message.type) {
      case SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE: {
        const entry = registry[message.name];
        if (entry) {
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
          } as IPCResourceUpdatedMessage<T>);

          const cb = (state: unknown) => {
            child.send({
              type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED,
              name: message.name,
              value: state,
            } as IPCResourceUpdatedMessage<T>);
          };
          entry.subscribers.add(cb);
          const cleanup = () => entry.subscribers.delete(cb);
          child.once('exit', cleanup);
          child.once('disconnect', cleanup);
        } else {
          child.send({
            type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
            name: message.name,
            value: null,
            id: message.id,
            rpcs: [],
            error: `Shared resource "${message.name}" not found`,
          } as IPCResponse);
        }
        break;
      }

      case SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL: {
        const entry = registry[message.name];
        if (!entry) return;

        const method = message.method as MethodsOf<typeof entry.state>;
        if (!method) return;

        const result = await (
          entry.state[method] as (...args: unknown[]) => Promise<unknown>
        )(...(message.args || []));

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

function constructSharedResourceWithRPCs<T extends SharedResource>(
  resource: T,
  rpcs: MethodsOf<T>[],
  name: string
): MethodsToRPC<T> {
  const result = {} as T & MethodsToRPC<T>;

  for (const key of Object.keys(resource)) {
    Object.assign(result, {
      [key]: resource[key],
    });
  }

  for (const key of rpcs) {
    Object.assign(result, {
      [key]: async (...args: ArgumentsOf<T[typeof key]>) => {
        const rpcResult = await remoteProcedureCall<T, typeof key>(
          name,
          key,
          ...args
        );
        if (
          rpcResult &&
          typeof rpcResult.latest === 'object' &&
          rpcResult.latest !== null
        ) {
          Object.assign(result, rpcResult.latest);
        }
        return rpcResult.result;
      },
    });
  }
  return result;
}

export function getSharedResourceFactory(
  proc: IPCEventEmitter = process as IPCEventEmitter
) {
  return function getSharedResource<T extends SharedResource>(
    name: string
  ): Promise<MethodsToRPC<T>> {
    assertSharedResourcesActive();
    return new Promise((resolve, reject) => {
      const requestId = `${name}-${Date.now()}-${Math.random()}`;

      let resolved = false;
      let resourceProxy: MethodsToRPC<T> | null = null;

      const responseHandler = (
        message: IPCResourceResultMessage<T> | IPCResourceUpdatedMessage<T>
      ) => {
        if (
          message.type === SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT &&
          message.id === requestId &&
          !resolved
        ) {
          resourceProxy = constructSharedResourceWithRPCs<T>(
            message.value as T,
            message.rpcs as MethodsOf<T>[],
            name
          );
          resolved = true;
          resolve(resourceProxy);
        }
        if (
          message.type === SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED &&
          message.name === name &&
          resourceProxy
        ) {
          Object.assign(resourceProxy, message.value);
        }
      };

      proc.on('message', responseHandler);

      proc.send!({
        type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
        name,
        id: requestId,
      } as IPCGetMessage);

      setTimeout(() => {
        proc.off('message', responseHandler);
        if (!resolved) {
          reject(new Error(`Timeout waiting for shared resource "${name}"`));
        }
      }, 5000);
    });
  };
}

export const getSharedResource = getSharedResourceFactory();
export const remoteProcedureCall = remoteProcedureCallFactory();
