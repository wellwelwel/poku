import type { RetryContext } from '../@types/retry.js';

export const retryContext: {
  stack: RetryContext[] | null;
} = {
  stack: null,
};
