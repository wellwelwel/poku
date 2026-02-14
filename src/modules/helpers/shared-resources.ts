import type { ChildProcess } from 'node:child_process';
import type {
  IPCEventEmitter,
  IPCMessage,
  IPCRemoteProcedureCallMessage,
  IPCRemoteProcedureCallResultMessage,
  IPCRequestResourceMessage,
  IPCResourceResultMessage,
  IPCResponse,
  MethodsToRPC,
  ResourceContext,
  SendIPCMessageOptions,
  SharedResourceEntry,
} from '../../@types/shared-resources.js';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { GLOBAL } from '../../configs/poku.js';
import { findFileFromStack } from '../../parsers/find-file-from-stack.js';
import { hasArg } from '../../parsers/get-arg.js';
import { isWindows } from '../../parsers/os.js';
import { ResourceRegistry } from '../../services/resource-registry.js';

if (hasArg('sharedResources')) GLOBAL.configs.sharedResources = true;

const resourceRegistry = new ResourceRegistry<SharedResourceEntry>();
const moduleCounters = new Map<string, number>();

export const SHARED_RESOURCE_MESSAGE_TYPES = {
  REQUEST_RESOURCE: 'shared_resources_requestResource',
  RESOURCE_RESULT: 'shared_resources_resourceResult',
  REMOTE_PROCEDURE_CALL: 'shared_resources_remoteProcedureCall',
  REMOTE_PROCEDURE_CALL_RESULT: 'shared_resources_remoteProcedureCallResult',
} as const;

export const assertSharedResourcesActive = () => {
  if (!GLOBAL.configs.sharedResources)
    throw new Error(
      'Shared resources are not enabled. Please enable them in your configuration.'
    );
};

export const globalRegistry = resourceRegistry.getRegistry();

const create = <T>(
  factory: () => T,
  options?: { onDestroy?: (instance: Awaited<T>) => void | Promise<void> }
): ResourceContext<Awaited<T>> => {
  const err = { stack: '' };
  Error.captureStackTrace(err, create);
  const module = findFileFromStack(err.stack);

  const count = (moduleCounters.get(module) ?? 0) + 1;
  moduleCounters.set(module, count);
  const name = count === 1 ? module : `${module}#${count}`;

  return {
    factory,
    onDestroy: options?.onDestroy,
    name,
    module,
  } as ResourceContext<Awaited<T>>;
};

const use = async <T>(
  context: ResourceContext<T>
): Promise<MethodsToRPC<T>> => {
  assertSharedResourcesActive();

  const { name } = context;

  // Parent Process (Host)
  if (!process.send || resourceRegistry.getIsRegistering()) {
    const existing = resourceRegistry.get(name);
    if (existing) {
      return existing.state as MethodsToRPC<T>;
    }

    const state = await context.factory();
    resourceRegistry.register(name, {
      state,
      onDestroy: context.onDestroy as
        | ((instance: unknown) => void | Promise<void>)
        | undefined,
    });

    return state as MethodsToRPC<T>;
  }

  if (!context.module)
    throw new Error(
      `Resource "${name}" is missing "module". Use createResource() or set module explicitly.`
    );

  return requestResource(name, context.module) as unknown as MethodsToRPC<T>;
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

const requestResource = async (name: string, module: string) => {
  const requestId = `${name}-${Date.now()}-${Math.random()}`;

  const response = await sendIPCMessage<IPCResourceResultMessage>({
    message: {
      type: SHARED_RESOURCE_MESSAGE_TYPES.REQUEST_RESOURCE,
      name,
      module,
      id: requestId,
    },
    validator: (message): message is IPCResourceResultMessage =>
      typeof message === 'object' &&
      message !== null &&
      'type' in message &&
      message.type === SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT &&
      'id' in message &&
      message.id === requestId,
  });

  if (response.error || !response.value || !response.rpcs)
    throw new Error(
      response.error ?? `Invalid response for resource "${name}"`
    );

  return constructSharedResourceWithRPCs(
    response.value as Record<string, unknown>,
    response.rpcs,
    name
  );
};

const remoteProcedureCall = async (
  name: string,
  method: string,
  args: unknown[]
) => {
  const requestId = `${name}-${method}-${Date.now()}-${Math.random()}`;

  const response = await sendIPCMessage<IPCRemoteProcedureCallResultMessage>({
    message: {
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
      name,
      method,
      args,
      id: requestId,
    } satisfies IPCRemoteProcedureCallMessage,
    validator: (message): message is IPCRemoteProcedureCallResultMessage =>
      typeof message === 'object' &&
      message !== null &&
      'id' in message &&
      message.id === requestId,
  });

  if (response.error || !response.value)
    throw new Error(
      response.error ?? `Invalid RPC response for "${name}.${method}"`
    );

  return response.value;
};

export const extractFunctionNames = (obj: Record<string, unknown>) => {
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

  return Array.from(seen);
};

export const setupSharedResourceIPC = (
  child: IPCEventEmitter | ChildProcess,
  registry: Record<string, SharedResourceEntry> = globalRegistry
): void => {
  child.on('message', async (message: IPCMessage) => {
    if (message.type === SHARED_RESOURCE_MESSAGE_TYPES.REQUEST_RESOURCE)
      await handleRequestResource(message, registry, child);
    else if (
      message.type === SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL
    )
      await handleRemoteProcedureCall(message, registry, child);
  });
};

export const handleRequestResource = async (
  message: IPCRequestResourceMessage,
  registry: Record<string, SharedResourceEntry>,
  child: IPCEventEmitter | ChildProcess
) => {
  try {
    if (!registry[message.name]) {
      resourceRegistry.setIsRegistering(true);

      try {
        const modulePath = isWindows
          ? pathToFileURL(message.module).href
          : message.module;

        const mod: Record<string, unknown> = await import(modulePath);

        for (const key in mod) {
          if (Object.prototype.hasOwnProperty.call(mod, key)) {
            const exported = mod[key];

            if (
              exported &&
              typeof exported === 'object' &&
              'factory' in exported &&
              typeof exported.factory === 'function'
            )
              await use(exported as ResourceContext<unknown>);
          }
        }
      } finally {
        resourceRegistry.setIsRegistering(false);
      }
    }

    const entry = registry[message.name];
    if (!entry) {
      child.send({
        type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
        name: message.name,
        id: message.id,
        error: `Resource "${message.name}" not found in module "${message.module}"`,
      } satisfies IPCResponse);
      return;
    }

    const rpcs = extractFunctionNames(entry.state as Record<string, unknown>);

    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
      name: message.name,
      value: entry.state,
      rpcs,
      id: message.id,
    } satisfies IPCResourceResultMessage);
  } catch (error) {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
      name: message.name,
      id: message.id,
      error: error instanceof Error ? error.message : String(error),
    } satisfies IPCResponse);
  }
};

export const handleRemoteProcedureCall = async (
  message: IPCRemoteProcedureCallMessage,
  registry: Record<string, SharedResourceEntry>,
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

  const state = entry.state as Record<string, unknown>;

  if (!message.method) {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
      id: message.id,
      error: 'Method name is missing',
    } satisfies IPCResponse);
    return;
  }

  const methodCandidate = state[message.method];
  if (typeof methodCandidate !== 'function') {
    child.send({
      type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT,
      id: message.id,
      error: `Method "${message.method}" not found on resource "${message.name}"`,
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
        latest: state,
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

const constructSharedResourceWithRPCs = (
  target: Record<string, unknown>,
  rpcs: string[],
  name: string
) => {
  if (rpcs.length === 0) return target;

  return new Proxy(target, {
    get(target, prop, receiver) {
      if (typeof prop === 'string' && rpcs.includes(prop)) {
        return async (...args: unknown[]) => {
          const rpcResult = await remoteProcedureCall(name, prop, args);

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
  });
};

export const resource = {
  create,
  use,
} as const;
