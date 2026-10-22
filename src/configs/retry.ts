import type { RetryContext, RetryState } from '../@types/retry.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getSharedState } from './shared-state.js';

export const retryContext: RetryState = getSharedState<RetryState>(
  'retryContext',
  {
    get stack() {
      return retryContext.storage?.getStore() ?? null;
    },
    run(context, callback) {
      retryContext.storage ??= new AsyncLocalStorage();
      const storage = retryContext.storage;
      return storage.run([...(storage.getStore() ?? []), context], callback);
    },
  }
);

export const peekRetryContext = (): RetryContext | undefined =>
  retryContext.stack?.[retryContext.stack.length - 1];
