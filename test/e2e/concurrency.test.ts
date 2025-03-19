import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { test } from '../../src/modules/helpers/test.js';

test('Start 30 servers on the same port 10 times', async () => {
  for (let i = 0; i < 10; i++) {
    const results = await inspectPoku('-d --sequential', {
      cwd: 'test/__fixtures__/e2e/concurrency/sequence',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0);
  }
});
