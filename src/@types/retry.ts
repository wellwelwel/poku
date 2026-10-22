import type { AsyncLocalStorage } from 'node:async_hooks';

export type RetryConfig = {
  attempts: number;
  delay?: number;
};

export type RetryContext = {
  attempts: number;
  currentAttempt: number;
  delay: number;
  failed: boolean;
  silent?: boolean;
};

export type RetryState = {
  readonly stack: RetryContext[] | null;
  storage?: AsyncLocalStorage<RetryContext[]>;
  run: <Result>(context: RetryContext, callback: () => Result) => Result;
};
