import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (GLOBAL.runtime !== 'node' || isBuild)
  skip('Exclusive tests for Node.js + TSX');

describe('Ensure module types', async () => {
  await it('CommonJS', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/module-types/cjs',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  });

  await it('ES Modules', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/module-types/mjs',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  });
});
