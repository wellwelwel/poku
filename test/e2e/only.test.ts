import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { nodeVersion } from '../../src/parsers/get-runtime.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (nodeVersion && nodeVersion < 12) skip();

describe('Only', async () => {
  await it('Normal usage', async () => {
    const results = await inspectPoku('--only --debug', {
      cwd: 'test/__fixtures__/e2e/only',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
  });

  await it('Should fail without `--only`', async () => {
    if (nodeVersion && nodeVersion < 16) return;

    const results = await inspectPoku('--debug', {
      cwd: 'test/__fixtures__/e2e/only',
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Failed');
  });
});
