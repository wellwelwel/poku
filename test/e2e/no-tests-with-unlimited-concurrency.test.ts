import { test } from '../../src/modules/helpers/test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) {
  skip();
}

test('No tests with unlimited concurrency', async () => {
  const output = await inspectPoku('--debug --parallel --concurrency=0', {
    cwd: 'test/__fixtures__/e2e/no-tests',
  });

  assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
  assert(
    /debug(.+)?:(.+)?true/.test(output.stdout),
    'CLI needs to able "debug"'
  );
  assert(
    /concurrency(.+)?:(.+)?0/.test(output.stdout),
    'CLI needs to able "concurrency"'
  );
});
