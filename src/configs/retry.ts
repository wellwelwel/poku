import type { RetryContext } from '../@types/retry.js';
import { getSharedState } from './shared-state.js';

export const retryContext = getSharedState<{
  stack: RetryContext[] | null;
}>('retryContext', {
  stack: null,
});
