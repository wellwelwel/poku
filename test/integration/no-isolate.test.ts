import { join } from 'node:path';
import { isBuild } from '../__utils__/capture-cli.test.js';
import { GLOBAL, results } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { runTestInProcess } from '../../src/services/run-test-in-process.js';

if (isBuild) skip();

const savedConfigs = { ...GLOBAL.configs };
const fixtureDir = 'test/__fixtures__/e2e/no-isolate';
const fixture = (name: string) => join(process.cwd(), fixtureDir, name);

const resetState = () => {
  results.passed = 0;
  results.failed = 0;
  results.skipped = 0;
  results.todo = 0;
  process.exitCode = undefined;
};

describe('Service: runTestInProcess', async () => {
  await it('pass', async () => {
    resetState();
    GLOBAL.configs = {
      ...savedConfigs,
      isolation: 'none',
      quiet: true,
    };

    const result = await runTestInProcess(fixture('pass.test.ts'));
    assert.strictEqual(result, true, 'Pass fixture should succeed');
  });

  await it('exit-code failure', async () => {
    resetState();
    GLOBAL.configs = {
      ...savedConfigs,
      isolation: 'none',
      quiet: true,
    };

    const result = await runTestInProcess(fixture('exit-code.test.ts'));
    assert.strictEqual(result, false, 'exit-code fixture should fail');
  });

  await it('timeout', async () => {
    resetState();
    GLOBAL.configs = {
      ...savedConfigs,
      isolation: 'none',
      quiet: true,
      timeout: 500,
    };

    const result = await runTestInProcess(fixture('timeout.test.ts'));
    assert.strictEqual(result, false, 'Timeout fixture should fail');
  });

  await it('beforeEach failure', async () => {
    resetState();
    GLOBAL.configs = {
      ...savedConfigs,
      isolation: 'none',
      quiet: true,
      beforeEach: () => {
        throw new Error('beforeEach failed');
      },
    };

    const result = await runTestInProcess(fixture('pass.test.ts'));
    assert.strictEqual(result, false, 'beforeEach failure should fail');
  });

  await it('afterEach failure', async () => {
    resetState();
    GLOBAL.configs = {
      ...savedConfigs,
      isolation: 'none',
      quiet: true,
      afterEach: () => {
        throw new Error('afterEach failed');
      },
    };

    const result = await runTestInProcess(fixture('pass.test.ts'));
    assert.strictEqual(result, false, 'afterEach failure should fail');
  });

  resetState();
  GLOBAL.configs = savedConfigs;
});
