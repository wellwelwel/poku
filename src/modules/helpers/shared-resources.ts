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
  MessageHandler,
  MethodsOf,
  MethodsToRPC,
  ResourceContext,
  ReturnTypeOf,
  RPCResult,
  SendIPCMessageOptions,
  SharedResource,
  SharedResourceEntry,
} from '../../@types/shared-resources.js';
import { readFile } from 'node:fs/promises';
import { dirname, isAbsolute, resolve } from 'node:path';
import process, { env } from 'node:process';
import { pathToFileURL } from 'node:url';
import { findFile } from '../../parsers/find-file-from-process-arguments.js';
import { parseImports } from '../../parsers/imports.js';
import { ResourceRegistry } from './resource-registry.js';

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

const resourceRegistry = new ResourceRegistry<SharedResourceEntry<unknown>>();
export const globalRegistry = resourceRegistry.getRegistry();
export const clearGlobalRegistry = () => resourceRegistry.clear();

export const shared = async <T>(
  context: ResourceContext<T>
): Promise<MethodsToRPC<T>> => {
  const { name } = context;

  // Parent Process (Host)
  if (!process.send || resourceRegistry.getIsRegistering()) {
    if (resourceRegistry.has(name)) {
      return resourceRegistry.get(name)!.state as MethodsToRPC<T>;
    }

    const state = await context.factory();
    resourceRegistry.register(name, {
      state,
      cleanup: context.cleanup as
        | ((instance: unknown) => void | Promise<void>)
        | undefined,
    });

    return state as MethodsToRPC<T>;
  }

  const filePath = findFile();

  // Child Process (Test)
  assertSharedResourcesActive();

  return requestResource(name, filePath) as unknown as MethodsToRPC<T>;
};

export const sendIPCMessage = <TResponse>(
  options: SendIPCMessageOptions<TResponse>
): Promise<TResponse> => {
  const {
    message,
    validator,
    timeout,
    emitter = process,
    sender = process.send?.bind(process),
  } = options;

  return new Promise((resolve, reject) => {
    if (!sender) {
      reject(new Error('IPC sender is not available'));
      return;
    }

    let timer: NodeJS.Timeout | undefined;

    const handleMessage = (response: unknown) => {
      if (validator(response)) {
        cleanup();
        resolve(response);
      }
    };

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      emitter.off('message', handleMessage);
    };

    if (typeof timeout === 'number' && timeout > 0) {
      timer = setTimeout(() => {
        cleanup();
        reject(new Error(`IPC request timed out after ${timeout}ms`));
      }, timeout);
    }

    emitter.on('message', handleMessage);

    try {
      sender(message);
    } catch (error) {
      cleanup();
      reject(error);
    }
  });
};

const requestResource = async <
  T extends SharedResource,
  TResult extends IPCResourceResultMessage<T> = IPCResourceResultMessage<T>,
>(
  name: string,
  filePath: string
): Promise<MethodsToRPC<T>> => {
  const requestId = `${name}-${Date.now()}-${Math.random()}`;

  const response = await sendIPCMessage<TResult>({
    message: {
      type: SHARED_RESOURCE_MESSAGE_TYPES.REQUEST_RESOURCE,
      name,
      filePath,
      id: requestId,
    },
    validator: (message): message is TResult =>
      (message as TResult)?.type ===
        SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT &&
      (message as TResult)?.id === requestId,
  });

  return constructSharedResourceWithRPCs(response.value, response.rpcs, name);
};

export const remoteProcedureCall = async <
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

  const response = await sendIPCMessage<TMessage>({
    message: {
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
      name,
      method,
      args,
      id: requestId,
    } satisfies IPCRemoteProcedureCallMessage,
    validator: (message): message is TMessage =>
      (message as TMessage)?.id === requestId,
  });

  if (response.error) {
    throw new Error(response.error);
  }

  return response.value!;
};

const functionNamesCache = new Map<object, string[]>();

export const extractFunctionNames = <T extends Record<string, unknown>>(
  obj: T
) => {
  const objConstructor = obj.constructor;
  if (objConstructor && functionNamesCache.has(objConstructor)) {
    return functionNamesCache.get(objConstructor) as MethodsOf<T>[];
  }

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

  const result = Array.from(seen) as MethodsOf<T>[];
  if (objConstructor) {
    functionNamesCache.set(objConstructor, result as string[]);
  }

  return result;
};

const messageHandlers: Record<string, MessageHandler> = {
  [SHARED_RESOURCE_MESSAGE_TYPES.REQUEST_RESOURCE]: (
    message,
    registry,
    child
  ) =>
    handleRequestResource(
      message as IPCRequestResourceMessage,
      registry,
      child
    ),
  [SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL]: (
    message,
    registry,
    child
  ) =>
    handleRemoteProcedureCall(
      message as IPCRemoteProcedureCallMessage,
      registry,
      child
    ),
};

export const setupSharedResourceIPC = (
  child: IPCEventEmitter | ChildProcess,
  registry: Record<string, SharedResourceEntry<unknown>> = globalRegistry
): void => {
  child.on('message', async (message: IPCMessage) => {
    const handler = messageHandlers[message.type];
    if (handler) {
      await handler(message, registry, child);
    }
  });
};

export const loadResourceFromFile = async (
  name: string,
  filePath: string,
  deps: {
    readFile?: typeof readFile;
    importer?: (url: string) => Promise<unknown>;
  } = {}
): Promise<void> => {
  const {
    readFile: readFileFn = readFile,
    importer = (url: string) => import(url),
  } = deps;

  const content = await readFileFn(filePath, 'utf-8');
  const imports = parseImports(content);
  const dir = dirname(filePath);

  for (const imp of imports) {
    let targetUrl: string;

    if (imp.module.startsWith('.')) {
      const absolutePath = resolve(dir, imp.module);
      targetUrl =
        process.platform === 'win32'
          ? pathToFileURL(absolutePath).href
          : absolutePath;
    } else if (isAbsolute(imp.module)) {
      targetUrl =
        process.platform === 'win32'
          ? pathToFileURL(imp.module).href
          : imp.module;
    } else {
      targetUrl = imp.module;
    }

    const module = (await importer(targetUrl)) as Record<string, unknown>;

    for (const key in module) {
      if (Object.prototype.hasOwnProperty.call(module, key)) {
        const exported = module[key] as { name?: unknown; factory?: unknown };
        if (
          exported &&
          typeof exported === 'object' &&
          exported.name === name &&
          typeof exported.factory === 'function'
        ) {
          await shared(exported as unknown as ResourceContext<unknown>);
          break;
        }
      }
    }
  }
};

export const handleRequestResource = async (
  message: IPCRequestResourceMessage,
  registry: Record<string, SharedResourceEntry<unknown>>,
  child: IPCEventEmitter | ChildProcess
) => {
  if (!registry[message.name]) {
    resourceRegistry.setIsRegistering(true);

    try {
      await loadResourceFromFile(message.name, message.filePath);
    } finally {
      resourceRegistry.setIsRegistering(false);
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

export const constructSharedResourceWithRPCs = <T extends SharedResource>(
  resource: T,
  rpcs: MethodsOf<T>[],
  name: string
): MethodsToRPC<T> => {
  if (rpcs.length === 0) return resource as MethodsToRPC<T>;

  return new Proxy(resource, {
    get(target, prop, receiver) {
      if (rpcs.includes(prop as MethodsOf<T>)) {
        return async (...args: ArgumentsOf<T[MethodsOf<T>]>) => {
          const rpcResult = await remoteProcedureCall<T, MethodsOf<T>>(
            name,
            prop as MethodsOf<T>,
            ...args
          );

          for (const rpcKey of rpcs) {
            if (rpcKey in rpcResult.latest) {
              delete rpcResult.latest[rpcKey];
            }
          }

          Object.assign(target, rpcResult.latest);
          return rpcResult.result;
        };
      }

      return Reflect.get(target, prop, receiver);
    },
  }) as MethodsToRPC<T>;
};
