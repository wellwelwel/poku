import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { inspectPoku, stripAnsi } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';

const fixturesDir = 'test/__fixtures__/e2e/retries';
const tempDir = join(fixturesDir, '.temp');
const counterFile = join(tempDir, 'retry-counter');

const cleanupCounter = () => {
  try {
    if (existsSync(counterFile)) unlinkSync(counterFile);
  } catch {}
};

describe('Retry Feature', async () => {
  await it('CLI: --retries=0 should not retry (default behavior)', async () => {
    const output = await inspectPoku(
      `--retries=0 ${fixturesDir}/always-passes.test.ts`
    );

    assert.strictEqual(output.exitCode, 0, 'Should pass with no retries');
  });

  await it('CLI: --retries=2 with always-failing test should still fail', async () => {
    const output = await inspectPoku(
      `--retries=2 ${fixturesDir}/always-fails.test.ts`
    );
    const stdout = stripAnsi(output.stdout);

    assert.strictEqual(output.exitCode, 1, 'Should fail even with retries');
    assert(stdout.includes('Retrying'), 'Should show retry messages');
  });

  await it('CLI: --retries=2 with always-passing test should pass without retries', async () => {
    const output = await inspectPoku(
      `--retries=2 ${fixturesDir}/always-passes.test.ts`
    );

    assert.strictEqual(
      output.exitCode,
      0,
      'Should pass without needing retries'
    );
  });

  await it('CLI: --retries=2 with flaky test that passes on 3rd attempt', async () => {
    cleanupCounter();

    const output = await inspectPoku(
      `--retries=2 ${fixturesDir}/flaky-passes-on-third.test.ts`
    );

    assert.strictEqual(output.exitCode, 0, 'Should pass after retries');

    cleanupCounter();
  });

  await it('CLI: per-test retries with it(title, { retries }, cb)', async () => {
    const output = await inspectPoku(
      `--timeout=10000 ${fixturesDir}/per-test-retry.test.ts`
    );
    const stdout = stripAnsi(output.stdout);

    assert.strictEqual(output.exitCode, 0, 'Should pass with per-test retry');
    assert(stdout.includes('1 retry'), 'Should show retry count in output');
  });

  await it('CLI: per-test retries with it({ retries }, cb) options-first syntax', async () => {
    const output = await inspectPoku(
      `--timeout=10000 ${fixturesDir}/per-test-retry-options-first.test.ts`
    );

    assert.strictEqual(
      output.exitCode,
      0,
      'Should pass with per-test retry (options-first)'
    );
  });

  await it('Config file with retries', async () => {
    const output = await inspectPoku(
      `--config=test/__fixtures__/e2e/retries/poku.config.js ${fixturesDir}/always-passes.test.ts`
    );

    assert.strictEqual(
      output.exitCode,
      0,
      'Should pass with config file retries'
    );
  });
});
