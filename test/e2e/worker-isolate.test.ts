import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';

describe('--isolation=worker', async () => {
  await it('passing test', async () => {
    const results = await inspectPoku(
      '--debug --isolation=worker --filter=pass',
      {
        cwd: 'test/__fixtures__/e2e/worker-isolate',
      }
    );

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Exit code needs to be 0');
  });

  await it('failing test', async () => {
    const results = await inspectPoku(
      '--debug --isolation=worker --filter=fail',
      {
        cwd: 'test/__fixtures__/e2e/worker-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('detects process.exitCode failure', async () => {
    const results = await inspectPoku(
      '--debug --isolation=worker --filter=exit-code',
      {
        cwd: 'test/__fixtures__/e2e/worker-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('process.exit(1) is intercepted', async () => {
    const results = await inspectPoku(
      '--debug --isolation=worker --filter=process-exit',
      {
        cwd: 'test/__fixtures__/e2e/worker-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('top-level throw', async () => {
    const results = await inspectPoku(
      '--debug --isolation=worker --filter=throw',
      {
        cwd: 'test/__fixtures__/e2e/worker-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('timeout via CLI flag', async () => {
    const results = await inspectPoku(
      '--debug --isolation=worker --filter=timeout --timeout=500',
      {
        cwd: 'test/__fixtures__/e2e/worker-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('captures stdout and stderr', async () => {
    const results = await inspectPoku(
      '--debug --isolation=worker --filter=output-capture',
      {
        cwd: 'test/__fixtures__/e2e/worker-isolate',
      }
    );

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Exit code needs to be 0');
    assert(
      results.stdout.includes('WORKER_STDOUT_MARKER'),
      'Needs to capture stdout'
    );

    const stderrCaptured =
      results.stdout.includes('WORKER_STDERR_MARKER') ||
      results.stderr.includes('WORKER_STDERR_MARKER');

    assert(stderrCaptured, 'Needs to capture stderr');
  });

  await it('quiet mode', async () => {
    const results = await inspectPoku(
      '--quiet --isolation=worker --filter=pass',
      {
        cwd: 'test/__fixtures__/e2e/worker-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 0, 'Exit code needs to be 0');
    assert.strictEqual(results.stdout, '', 'No output in quiet mode');
  });

  await it('ts files fallback to process isolation', async () => {
    const results = await inspectPoku(
      '--debug --isolation=worker --filter=pass',
      {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      }
    );

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(
      results.exitCode,
      0,
      'TS files should work via process fallback'
    );
  });
});
