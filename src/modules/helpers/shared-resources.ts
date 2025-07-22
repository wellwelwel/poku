import type { ChildProcess } from 'node:child_process';

const SHARED_RESOURCE_MESSAGE_TYPES = {
  GET_RESOURCE: 'shared_resources_getResource',
  DISPATCH_ACTION: 'shared_resources_dispatchAction',
  RESOURCE_RESULT: 'shared_resources_resourceResult',
  RESOURCE_UPDATED: 'shared_resources_resourceUpdated',
  SUBSCRIBE: 'shared_resources_subscribe',
} as const;

export interface IPCMessage {
  type:
    | typeof SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE
    | typeof SHARED_RESOURCE_MESSAGE_TYPES.DISPATCH_ACTION
    | typeof SHARED_RESOURCE_MESSAGE_TYPES.SUBSCRIBE;
  name: string;
  id?: string;
  action?: unknown;
}

export interface IPCResponse {
  type:
    | typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT
    | typeof SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED;
  name: string;
  value?: unknown;
  id?: string;
  error?: string;
}

type Reducer<T, A> = (state: T, action: A) => T;
type Subscriber<T> = (state: T) => void;
type Action = {
  type: string;
  payload?: unknown;
};

export interface SharedResourceEntry<T = unknown, A = unknown> {
  state: T;
  reducer: Reducer<T, A>;
  subscribers: Set<Subscriber<T>>;
}

export function createSharedResource<T>(
  name: string,
  factory: () => T,
  reducer: Reducer<T, Action>
): { entry: SharedResourceEntry<T, Action>; name: string } {
  const entry: SharedResourceEntry<T, Action> = {
    state: factory(),
    reducer,
    subscribers: new Set<Subscriber<T>>(),
  };
  return { entry, name };
}

export function getSharedResource<T>(name: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const requestId = `${name}-${Date.now()}-${Math.random()}`;

    const responseHandler = (message: IPCResponse) => {
      if (
        message.type === SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT &&
        message.id === requestId
      ) {
        process.off('message', responseHandler);
        if (message.error) {
          reject(new Error(message.error));
        } else {
          resolve(message.value as T);
        }
      }
    };

    process.on('message', responseHandler);

    process.send!({
      type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
      name,
      id: requestId,
    } as IPCMessage);

    setTimeout(() => {
      process.off('message', responseHandler);
      reject(new Error(`Timeout waiting for shared resource "${name}"`));
    }, 5000);
  });
}

export function dispatchSharedResourceAction<A>(name: string, action: A): void {
  process.send!({
    type: SHARED_RESOURCE_MESSAGE_TYPES.DISPATCH_ACTION,
    name,
    action,
  } as IPCMessage);
}

export function subscribeToSharedResource<T>(
  name: string,
  callback: Subscriber<T>
): () => void {
  const responseHandler = (message: IPCResponse) => {
    if (message.type !== SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED) return;
    if (message.name !== name) return;
    callback(message.value as T);
  };

  process.on('message', responseHandler);

  process.send!({
    type: SHARED_RESOURCE_MESSAGE_TYPES.SUBSCRIBE,
    name,
    id: 'subscribe',
  } as IPCMessage);

  return () => {
    process.off('message', responseHandler);
  };
}

export function setupSharedResourceIPC(
  child: ChildProcess,
  registry: Record<string, SharedResourceEntry>
): void {
  child.on('message', (message: IPCMessage) => {
    if (!message || typeof message.type !== 'string') return;
    switch (message.type) {
      case SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE: {
        const entry = registry[message.name];
        if (entry) {
          child.send({
            type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
            name: message.name,
            value: entry.state,
            id: message.id,
          } as IPCResponse);
        } else {
          child.send({
            type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT,
            name: message.name,
            id: message.id,
            error: `Shared resource "${message.name}" not found`,
          } as IPCResponse);
        }
        break;
      }

      case SHARED_RESOURCE_MESSAGE_TYPES.DISPATCH_ACTION: {
        const entry = registry[message.name];
        if (!entry) return;
        entry.state = entry.reducer(entry.state, message.action);
        for (const cb of entry.subscribers) cb(entry.state);
        break;
      }

      case SHARED_RESOURCE_MESSAGE_TYPES.SUBSCRIBE: {
        const entry = registry[message.name];
        if (!entry) return;

        if (!entry.subscribers) {
          entry.subscribers = new Set<Subscriber<unknown>>();
        }

        const cb = (state: unknown) => {
          child.send({
            type: SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED,
            name: message.name,
            value: state,
          } as IPCResponse);
        };

        entry.subscribers.add(cb);
        cb(entry.state); // Send initial state
        const cleanup = () => entry.subscribers.delete(cb);
        child.once('exit', cleanup);
        child.once('disconnect', cleanup);
        break;
      }
      default:
        break;
    }
  });
}
