import type { ChildProcess } from 'node:child_process';
import type EventEmitter from 'node:events';
import type { SHARED_RESOURCE_MESSAGE_TYPES } from '../modules/helpers/shared-resources.js';

export type IPCEventEmitter = EventEmitter & {
  send: (message: unknown, ...args: unknown[]) => boolean;
};

export type ResourceContext<T> = {
  name: string;
  module?: string;
  factory: () => T | Promise<T>;
  cleanup?: (instance: T) => void | Promise<void>;
};

export type SharedResourceEntry<T = unknown> = {
  state: T;
  cleanup?: (instance: T) => void | Promise<void>;
};

export type IPCRequestResourceMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.REQUEST_RESOURCE;
  name: string;
  module: string;
  id: string;
};

export type IPCRemoteProcedureCallMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL;
  name: string;
  id: string;
  method: string;
  args: unknown[];
};

export type IPCMessage =
  | IPCRequestResourceMessage
  | IPCRemoteProcedureCallMessage;

export type SendIPCMessageOptions<TResponse> = {
  message: { id: string; [key: string]: unknown };
  validator: (response: unknown) => response is TResponse;
  timeout?: number;
  emitter?: EventEmitter | IPCEventEmitter | ChildProcess;
  sender?: (message: unknown) => void;
};

export type IPCResourceResultMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT;
  name: string;
  id: string;
  value?: unknown;
  rpcs?: string[];
  error?: string;
};

export type IPCRemoteProcedureCallResultMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT;
  id: string;
  value?: { result: unknown; latest: Record<string, unknown> };
  error?: string;
};

export type IPCResponse =
  | IPCResourceResultMessage
  | IPCRemoteProcedureCallResultMessage;

export type MethodsToRPC<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<unknown>
    ? T[K]
    : T[K] extends (...args: infer A) => infer R
      ? (...args: A) => Promise<Awaited<R>>
      : T[K];
};
