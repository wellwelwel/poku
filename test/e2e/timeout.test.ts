import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';

describe('Timeout', async () => {
  const results = await inspectPoku('--timeout=3000', {
    cwd: 'test/__fixtures__/e2e/timeout',
  });

  if (results.exitCode !== 1) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 1, 'Failed');
  assert.match(
    results.stdout,
    /● should fail before closing the server/,
    'Failed `it` output is shown'
  );
  assert.match(
    results.stdout,
    /Intentional failure/,
    '`Error` output is shown'
  );
  assert.match(results.stdout, /Timeout/, 'Timeout message is shown');
});
