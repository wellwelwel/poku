import type { ChildProcess, Serializable } from 'node:child_process';
import type EventEmitter from 'node:events';
import type { SHARED_RESOURCE_MESSAGE_TYPES } from '../modules/helpers/shared-resources.js';

export interface IPCEventEmitter extends EventEmitter {
  send: (message: unknown, ...args: unknown[]) => boolean;
}

export type ResourceContext<T> = {
  name: string;
  factory: () => T | Promise<T>;
  cleanup?: (instance: T) => void | Promise<void>;
};

export interface SharedResourceEntry<T = unknown> {
  state: T;
  cleanup?: (instance: T) => void | Promise<void>;
}

export type SharedResource = Record<string, unknown>;

export type IPCRequestResourceMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.REQUEST_RESOURCE;
  name: string;
  filePath: string;
  id: string;
};

export type MessageHandler = (
  message: IPCMessage,
  registry: Record<string, SharedResourceEntry<unknown>>,
  child: IPCEventEmitter | ChildProcess
) => Promise<void>;

export type IPCRemoteProcedureCallMessage = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL;
  name: string;
  id: string;
  method: string | number | symbol;
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

export type IPCResourceResultMessage<T = unknown> = {
  type: typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT;
  name: string;
  id: string;
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
  | IPCRemoteProcedureCallResultMessage;

export type RPCResult<TResult, TResource> = {
  result: TResult;
  latest: TResource;
};

export type MethodsToRPC<T> = {
  [K in keyof T]: T[K] extends (...args: infer _) => Serializable
    ? (
        ...args: Parameters<T[K]>
      ) => ReturnType<T[K]> extends Promise<unknown>
        ? ReturnType<T[K]>
        : Promise<ReturnType<T[K]>>
    : T[K];
};

export type MethodsOf<T> = {
  [K in keyof T]: T[K] extends (...args: infer _) => Serializable ? K : never;
}[keyof T];

export type ArgumentsOf<T> =
  T extends MethodsOf<infer U>
    ? U extends (...args: infer P) => Serializable
      ? P & { length: number }
      : never
    : never;

export type ReturnTypeOf<T> =
  T extends MethodsOf<infer U>
    ? U extends (...args: infer _) => infer R
      ? R
      : never
    : never;

export type Cleanup<T = SharedResourceEntry> = (
  state: T
) => void | Promise<void>;

export type Registry = Record<string, SharedResourceEntry>;

export type ImportMember = {
  name: string;
  alias: string;
  type: 'default' | 'named' | 'namespace';
};

export type ImportDefinition = {
  module: string;
  members: ImportMember[];
  kind: 'esm' | 'cjs' | 'dynamic';
};

export type RequireDefinition = {
  result?: ImportDefinition;
  newIndex: number;
};

export type TokenType = 'keyword' | 'identifier' | 'string' | 'punctuation';

export type Token = {
  type: TokenType;
  value: string;
  index: number;
};
