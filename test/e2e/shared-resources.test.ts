import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (GLOBAL.runtime === 'deno') skip();

describe('Shared Resources', async () => {
  const results = await inspectPoku('--debug --sharedResources', {
    cwd: 'test/__fixtures__/e2e/shared-resources/test',
  });

  if (results.exitCode !== 0) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  assert(/PASS › 3/.test(results.stdout), 'CLI needs to pass 3');
  assert(/FAIL › 0/.test(results.stdout), 'CLI needs to fail 0');
});
