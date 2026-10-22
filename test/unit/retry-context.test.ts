import { strict as nodeAssert } from 'node:assert';
import { retryContext } from '../../src/configs/retry.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it, itBase } from '../../src/modules/helpers/it.js';
import { retry } from '../../src/modules/helpers/retry.js';

const deferredAssertionKey = Symbol.for('@poku/deferred-assertion');

describe('Retry context isolation', async () => {
  await it('does not suppress a sibling test while a retry callback awaits', async () => {
    const previousExitCode = process.exitCode;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const pending = retry(1, async () => {
      await gate;
    });
    let failureExitCode: typeof process.exitCode;
    try {
      await itBase(() => assert.strictEqual(1, 2));
      failureExitCode = process.exitCode;
    } finally {
      release();
      await pending;
      process.exitCode = previousExitCode ?? 0;
    }
    nodeAssert.strictEqual(failureExitCode, 1);
  });

  await it('defers a polling failure to the surrounding retry context', async () => {
    const previousExitCode = process.exitCode;
    let attempts = 0;
    try {
      await retry(2, () => {
        attempts++;
        if (attempts === 2) return;
        try {
          retryContext.run(
            {
              attempts: 1,
              currentAttempt: 1,
              delay: 0,
              failed: false,
              silent: true,
            },
            () => assert.strictEqual(1, 2)
          );
        } catch (error) {
          const deferred = (error as Record<symbol, unknown>)[
            deferredAssertionKey
          ];
          nodeAssert.strictEqual(typeof deferred, 'function');
          (deferred as () => void)();
        }
      });
      nodeAssert.strictEqual(attempts, 2);
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
    } finally {
      process.exitCode = previousExitCode ?? 0;
    }
  });

  await it('retries an exhausted nested block without poisoning its outer retry', async () => {
    const previousExitCode = process.exitCode;
    let attempts = 0;
    try {
      await retry(2, async () => {
        attempts++;
        await retry(1, () => {
          if (attempts === 1) throw new Error('first outer attempt failed');
        });
      });
      nodeAssert.strictEqual(attempts, 2);
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
    } finally {
      process.exitCode = previousExitCode ?? 0;
    }
  });

  await it('restores the retry context after asynchronous rejection', async () => {
    const previousExitCode = process.exitCode;
    try {
      await nodeAssert.rejects(
        retry(1, async () => {
          await Promise.resolve();
          throw new Error('retry exhausted');
        }),
        /retry exhausted/
      );
      nodeAssert.strictEqual(retryContext.stack, null);
      nodeAssert.strictEqual(process.exitCode, 1);
    } finally {
      process.exitCode = previousExitCode ?? 0;
    }
  });
});
