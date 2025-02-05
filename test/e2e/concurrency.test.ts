import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { test } from '../../src/modules/helpers/test.js';

if (isBuild) skip();

test('Start 30 servers on the same port', async () => {
  const results = await inspectPoku('--killPort=8000 -d --sequential', {
    cwd: 'test/__fixtures__/e2e/concurrency/sequence',
  });

  if (results.exitCode !== 0) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
});
