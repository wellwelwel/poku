import type { ReporterPlugin } from '../../src/@types/poku.js';
import { AssertionError, strict as nodeAssert } from 'node:assert';
import { EventEmitter } from 'node:events';
import { createRequire } from 'node:module';
import { assertionCapture } from '../../src/configs/assertion-capture.js';
import { indentation } from '../../src/configs/indentation.js';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { retry } from '../../src/modules/helpers/retry.js';
import { captureAssertions } from '../../src/modules/plugins.js';

process.exitCode ??= 0;

await describe('Plugin assertion capture', async () => {
  await it('leaves async storage cold for ordinary assertions and public retries', async () => {
    nodeAssert.strictEqual(assertionCapture.storage, undefined);
    assert.strictEqual(1, 1);
    await retry(1, () => assert.strictEqual(2, 2));
    nodeAssert.strictEqual(assertionCapture.storage, undefined);
  });

  await it('buffers failures without changing error metadata and reports once', async () => {
    const originalFailure = GLOBAL.reporter.onAssertionFailure;
    const previousExitCode = process.exitCode;
    let failures = 0;
    GLOBAL.reporter.onAssertionFailure = () => {
      failures++;
    };
    try {
      const result = await captureAssertions(() =>
        assert.strictEqual(1, 2, 'poll failure')
      );
      nodeAssert.strictEqual(result.status, 'failed');
      nodeAssert.strictEqual(failures, 0);
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
      if (result.status !== 'failed')
        throw new Error('Expected a failed capture');
      nodeAssert.ok(result.error instanceof AssertionError);
      nodeAssert.strictEqual(
        Object.getOwnPropertySymbols(result.error).includes(
          Symbol.for('@poku/deferred-assertion')
        ),
        false
      );
      result.report();
      result.report();
      nodeAssert.strictEqual(failures, 1);
      nodeAssert.strictEqual(process.exitCode, 1);
    } finally {
      GLOBAL.reporter.onAssertionFailure = originalFailure;
      process.exitCode = previousExitCode ?? 0;
    }
  });

  await it('shares capture state between CommonJS and ESM entry points', async () => {
    const require = createRequire(import.meta.url);
    const commonjs = require('../../lib/modules/index.cjs');
    const plugins = require('../../lib/modules/plugins.cjs');
    const previousExitCode = process.exitCode;
    const fromEsm = await captureAssertions(() =>
      commonjs.assert.strictEqual(1, 2)
    );
    const fromCommonjs = await plugins.captureAssertions(() =>
      assert.strictEqual(1, 2)
    );
    nodeAssert.strictEqual(fromEsm.status, 'failed');
    nodeAssert.strictEqual(fromCommonjs.status, 'failed');
    nodeAssert.strictEqual(process.exitCode, previousExitCode);
  });

  await it('returns successful values and buffers successful assertion events', async () => {
    const originalSuccess = GLOBAL.reporter.onAssertionSuccess;
    const labels: unknown[] = [];
    GLOBAL.reporter.onAssertionSuccess = ({ message }) => labels.push(message);
    try {
      const result = await captureAssertions(async () => {
        await Promise.resolve();
        assert.strictEqual(1, 1, 'completed');
        return 42;
      });
      nodeAssert.deepStrictEqual(labels, []);
      nodeAssert.strictEqual(result.status, 'passed');
      if (result.status !== 'passed')
        throw new Error('Expected a successful capture');
      nodeAssert.strictEqual(result.value, 42);
      result.report();
      result.report();
      nodeAssert.deepStrictEqual(labels, ['completed']);
    } finally {
      GLOBAL.reporter.onAssertionSuccess = originalSuccess;
    }
  });

  await it('does not suppress a sibling assertion while a capture is pending', async () => {
    const previousExitCode = process.exitCode;
    const originalFailure = GLOBAL.reporter.onAssertionFailure;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    GLOBAL.reporter.onAssertionFailure = () => {};
    const pending = captureAssertions(async () => {
      await gate;
      assert.strictEqual(1, 2);
    });
    try {
      nodeAssert.throws(() => assert.strictEqual(2, 3), AssertionError);
      nodeAssert.strictEqual(process.exitCode, 1);
      process.exitCode = previousExitCode ?? 0;
      release();
      const result = await pending;
      nodeAssert.strictEqual(result.status, 'failed');
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
    } finally {
      release();
      await pending;
      GLOBAL.reporter.onAssertionFailure = originalFailure;
      process.exitCode = previousExitCode ?? 0;
    }
  });

  await it('keeps concurrent captures independent and discards intermediate failures', async () => {
    const previousExitCode = process.exitCode;
    const results = await Promise.all([
      captureAssertions(async () => {
        await Promise.resolve();
        assert.strictEqual(1, 2);
      }),
      captureAssertions(async () => {
        await Promise.resolve();
        assert.strictEqual(2, 2);
        return 'passed';
      }),
    ]);
    nodeAssert.strictEqual(results[0].status, 'failed');
    nodeAssert.strictEqual(results[1].status, 'passed');
    nodeAssert.strictEqual(process.exitCode, previousExitCode);
    results[1].report();
  });

  await it('reports nested failures into the enclosing capture before committing them', async () => {
    const originalFailure = GLOBAL.reporter.onAssertionFailure;
    const previousExitCode = process.exitCode;
    let failures = 0;
    GLOBAL.reporter.onAssertionFailure = () => {
      failures++;
    };
    try {
      const result = await captureAssertions(async () => {
        const nested = await captureAssertions(() => assert.strictEqual(1, 2));
        nested.report();
        return 'caught failure';
      });
      nodeAssert.strictEqual(result.status, 'failed');
      nodeAssert.strictEqual(failures, 0);
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
      result.report();
      nodeAssert.strictEqual(failures, 1);
      nodeAssert.strictEqual(process.exitCode, 1);
    } finally {
      GLOBAL.reporter.onAssertionFailure = originalFailure;
      process.exitCode = previousExitCode ?? 0;
    }
  });

  await it('lets assertions that outlive a settled capture fail normally', async () => {
    const originalFailure = GLOBAL.reporter.onAssertionFailure;
    const previousExitCode = process.exitCode;
    let finish!: () => void;
    const finished = new Promise<void>((resolve) => {
      finish = resolve;
    });
    GLOBAL.reporter.onAssertionFailure = () => {};
    try {
      const result = await captureAssertions(() => {
        setTimeout(() => {
          try {
            assert.strictEqual(1, 2);
          } catch {
            finish();
          }
        }, 0);
        return 'settled';
      });
      nodeAssert.strictEqual(result.status, 'passed');
      await finished;
      nodeAssert.strictEqual(process.exitCode, 1);
    } finally {
      GLOBAL.reporter.onAssertionFailure = originalFailure;
      process.exitCode = previousExitCode ?? 0;
    }
  });

  await it('binds callbacks from resources created before capture and preserves their receiver', async () => {
    const previousExitCode = process.exitCode;
    const emitter = new EventEmitter();
    const timer = setInterval(() => emitter.emit('tick', 42), 1);
    try {
      const result = await captureAssertions(
        ({ bind }) =>
          new Promise<void>((resolve, reject) => {
            emitter.once(
              'tick',
              bind(function (this: EventEmitter, value: number) {
                nodeAssert.strictEqual(this, emitter);
                nodeAssert.strictEqual(value, 42);
                try {
                  assert.strictEqual(1, 2);
                  resolve();
                } catch (error) {
                  reject(error);
                }
              })
            );
          })
      );
      nodeAssert.strictEqual(result.status, 'failed');
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
    } finally {
      clearInterval(timer);
    }
  });

  await it('reports final polling failures to an enclosing public retry', async () => {
    const previousExitCode = process.exitCode;
    const originalFailure = GLOBAL.reporter.onAssertionFailure;
    GLOBAL.reporter.onAssertionFailure = () => {};
    let attempts = 0;
    try {
      await retry(2, async () => {
        attempts++;
        const result = await captureAssertions(() =>
          assert.strictEqual(attempts, 2)
        );
        result.report();
      });
      nodeAssert.strictEqual(attempts, 2);
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
    } finally {
      GLOBAL.reporter.onAssertionFailure = originalFailure;
      process.exitCode = previousExitCode ?? 0;
    }
  });

  await it('retains native thrown values without treating them as Poku assertions', async () => {
    const previousExitCode = process.exitCode;
    try {
      const result = await captureAssertions(() => {
        throw undefined;
      });
      nodeAssert.strictEqual(result.status, 'failed');
      if (result.status !== 'failed')
        throw new Error('Expected a failed capture');
      nodeAssert.strictEqual(result.error, undefined);
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
      result.report();
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
    } finally {
      process.exitCode = previousExitCode ?? 0;
    }
  });

  await it('defers the output of a test until its capture is reported', async () => {
    const originalStart = GLOBAL.reporter.onItStart;
    const originalEnd = GLOBAL.reporter.onItEnd;
    const originalFailure = GLOBAL.reporter.onAssertionFailure;
    const previousExitCode = process.exitCode;
    const previousDepth = indentation.itDepth;
    const events: string[] = [];
    GLOBAL.reporter.onItStart = ({ title }) => {
      if (title === 'captured test') events.push('start');
    };
    GLOBAL.reporter.onItEnd = ({ title, success }) => {
      if (title === 'captured test') events.push(`end:${success}`);
    };
    GLOBAL.reporter.onAssertionFailure = () => {
      events.push('failure');
    };
    try {
      const result = await captureAssertions(() =>
        it('captured test', () => {
          assert.strictEqual(1, 2);
        })
      );
      nodeAssert.deepStrictEqual(events, []);
      nodeAssert.strictEqual(process.exitCode, previousExitCode);
      result.report();
      nodeAssert.deepStrictEqual(events, ['start', 'failure', 'end:false']);
      nodeAssert.strictEqual(indentation.itDepth, previousDepth);
      nodeAssert.strictEqual(process.exitCode, 1);
    } finally {
      GLOBAL.reporter.onItStart = originalStart;
      GLOBAL.reporter.onItEnd = originalEnd;
      GLOBAL.reporter.onAssertionFailure = originalFailure;
      process.exitCode = previousExitCode ?? 0;
    }
  });

  await it('replays a capture through the reporter active when it is reported', async () => {
    const original = GLOBAL.reporter;
    const previousExitCode = process.exitCode;
    const received: string[] = [];
    const recordingReporter = (name: string): ReturnType<ReporterPlugin> => ({
      ...original,
      onAssertionSuccess: ({ message }) => {
        received.push(`${name} success: ${message}`);
      },
      onAssertionFailure: ({ assertOptions }) => {
        received.push(`${name} failure: ${assertOptions.message}`);
      },
    });

    try {
      GLOBAL.reporter = recordingReporter('recording');
      const result = await captureAssertions(() => {
        assert.ok(true, 'replayed success');
        assert.strictEqual(1, 2, 'replayed failure');
      });

      GLOBAL.reporter = recordingReporter('active');
      result.report();
    } finally {
      GLOBAL.reporter = original;
      process.exitCode = previousExitCode ?? 0;
    }

    nodeAssert.deepStrictEqual(received, [
      'active success: replayed success',
      'active failure: replayed failure',
    ]);
  });

  await it('holds back the events of a reporter that inherits its hooks', async () => {
    const original = GLOBAL.reporter;
    const received: string[] = [];
    let heldBack: string[] = [];

    try {
      GLOBAL.reporter = Object.create({
        ...original,
        onAssertionSuccess: ({ message }: { message: string }) => {
          received.push(message);
        },
      });

      const result = await captureAssertions(() => {
        assert.ok(true, 'inherited hook');
      });

      heldBack = [...received];
      result.report();
    } finally {
      GLOBAL.reporter = original;
    }

    nodeAssert.deepStrictEqual(heldBack, []);
    nodeAssert.deepStrictEqual(received, ['inherited hook']);
  });

  await it('produces a capture result with a frozen reporter', async () => {
    const original = GLOBAL.reporter;

    try {
      GLOBAL.reporter = Object.freeze({ ...original });
      const result = await captureAssertions(() => 'frozen reporter');

      nodeAssert.strictEqual(result.status, 'passed');
    } finally {
      GLOBAL.reporter = original;
    }
  });
});
