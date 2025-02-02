import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (GLOBAL.runtime === 'deno' || isBuild) skip();

describe('Ensure sequential runs', async () => {
  const results = await inspectPoku('--debug --sequential', {
    cwd: 'test/__fixtures__/e2e/sequential',
  });

  if (results.exitCode !== 0) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
});
