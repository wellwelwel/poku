import type { RetryConfig, RetryContext } from '../../@types/retry.js';
import { GLOBAL } from '../../configs/poku.js';
import { retryContext } from '../../configs/retry.js';

export async function retry(
  config: number | RetryConfig,
  callback: () => unknown | Promise<unknown>
): Promise<void> {
  const attempts = typeof config === 'number' ? config : config.attempts;
  const delay = typeof config === 'number' ? 0 : (config.delay ?? 0);

  if (!retryContext.stack) retryContext.stack = [];

  const stack = retryContext.stack;

  let lastError: unknown;
  let hasError = false;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const context: RetryContext = {
      attempts,
      currentAttempt: attempt,
      delay,
      failed: false,
    };

    stack.push(context);

    GLOBAL.reporter.onRetryStart({ attempt, total: attempts });

    try {
      const result = callback();
      if (result instanceof Promise) await result;

      if (!context.failed) {
        stack.pop();
        GLOBAL.reporter.onRetryEnd({
          attempt,
          total: attempts,
          success: true,
        });
        if (stack.length === 0) retryContext.stack = null;
        return;
      }
    } catch (error) {
      lastError = error;
      hasError = true;
    }

    stack.pop();
    GLOBAL.reporter.onRetryEnd({ attempt, total: attempts, success: false });

    if (attempt < attempts && delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  if (stack.length === 0) retryContext.stack = null;
  process.exitCode = 1;

  if (hasError) throw lastError;
}
