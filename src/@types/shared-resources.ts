import type EventEmitter from 'node:events';
import type { SHARED_RESOURCE_MESSAGE_TYPES } from '../modules/helpers/shared-resources.js';

export interface IPCEventEmitter extends EventEmitter {
  send: (message: unknown, ...args: unknown[]) => boolean;
}

export interface SharedResourceEntry<T = unknown> {
  state: T;
  subscribers: Set<(state: T) => void>;
}

export type SharedResource = Record<string, unknown>;

export type IPCGetMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE;
  name: string;
  id: string;
};

export type IPCRemoteProcedureCallMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL;
  name: string;
  id: string;
  method: string;
  args: unknown[];
};

export type IPCMessage = IPCGetMessage | IPCRemoteProcedureCallMessage;

export type IPCResourceNotFoundMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_NOT_FOUND;
  name: string;
};

export type IPCResourceResultMessage<T = unknown> = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT;
  name: string;
  id: string;
  value: T;
  rpcs: MethodsOf<T>[];
};

export type IPCResourceUpdatedMessage<T = unknown> = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED;
  name: string;
  value: T;
  rpcs: MethodsOf<T>[];
};

export type IPCRemoteProcedureCallResultMessage<T = unknown> = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT;
  id: string;
  value?: T;
  error?: string;
};

export type IPCResponse =
  | IPCResourceResultMessage
  | IPCResourceUpdatedMessage
  | IPCRemoteProcedureCallResultMessage;

export type RPCResult<TResult, TResource> = {
  result: TResult;
  latest: TResource;
};

export type MethodsToRPC<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => unknown
    ? (
        ...args: Parameters<T[K]>
      ) => ReturnType<T[K]> extends Promise<unknown>
        ? ReturnType<T[K]>
        : Promise<ReturnType<T[K]>>
    : T[K];
};

export type MethodsOf<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => unknown ? K : never;
}[keyof T];

export type ArgumentsOf<T> =
  T extends MethodsOf<infer U>
    ? U extends (...args: infer P) => unknown
      ? P & { length: number }
      : never
    : never;

export type ReturnTypeOf<T> =
  T extends MethodsOf<infer U>
    ? U extends (...args: unknown[]) => infer R
      ? R
      : never
    : never;

export type Cleanup<T = SharedResourceEntry> = (
  state: T
) => void | Promise<void>;
