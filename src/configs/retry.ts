import type { RetryContext } from '../@types/retry.js';
import { getSharedState } from './shared-state.js';

export const retryContext = getSharedState<{
  stack: RetryContext[] | null;
}>('retryContext', {
  stack: null,
});

export const peekRetryContext = (): RetryContext | undefined =>
  retryContext.stack?.[retryContext.stack.length - 1];
