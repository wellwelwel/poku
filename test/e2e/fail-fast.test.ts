import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) skip();

describe('Fail Fast', async () => {
  const results = await inspectPoku('', {
    cwd: 'test/__fixtures__/e2e/fail-fast/parallel',
  });

  if (results.exitCode !== 1) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 1, 'Failed');
  assert.match(results.stderr, /failFast/, 'Fail Fast is enabled');
});
