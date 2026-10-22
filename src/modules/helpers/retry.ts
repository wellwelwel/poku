import type { RetryConfig, RetryContext } from '../../@types/retry.js';
import { GLOBAL } from '../../configs/poku.js';
import { peekRetryContext, retryContext } from '../../configs/retry.js';
import { sleep } from './wait-for.js';

export async function retry(
  config: number | RetryConfig,
  callback: () => unknown | Promise<unknown>
): Promise<void> {
  const attempts = typeof config === 'number' ? config : config.attempts;
  const delay = typeof config === 'number' ? 0 : (config.delay ?? 0);

  let lastError: unknown;
  let hasError = false;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const context: RetryContext = {
      attempts,
      currentAttempt: attempt,
      delay,
      failed: false,
    };

    GLOBAL.reporter.onRetryStart?.({ attempt, total: attempts });

    await retryContext.run(context, async () => {
      try {
        await callback();
      } catch (error) {
        lastError = error;
        hasError = true;
        context.failed = true;
      }
    });

    if (!context.failed) {
      GLOBAL.reporter.onRetryEnd?.({
        attempt,
        total: attempts,
        success: true,
      });
      return;
    }

    GLOBAL.reporter.onRetryEnd?.({ attempt, total: attempts, success: false });

    if (attempt < attempts && delay > 0) {
      await sleep(delay);
    }
  }

  const parent = peekRetryContext();
  if (parent) parent.failed = true;
  else process.exitCode = 1;

  if (hasError) throw lastError;
}
