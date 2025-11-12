import { join } from 'node:path';
import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';

const finalPath = join(
  'test',
  '__fixtures__',
  'e2e',
  'shared-resources',
  'test'
);

describe('Shared Resources', async () => {
  const results = await inspectPoku('--debug --sharedResources', {
    cwd: finalPath,
  });

  if (results.exitCode !== 0) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  assert(/PASS › 3/.test(results.stdout), 'CLI needs to pass 3');
  assert(/FAIL › 0/.test(results.stdout), 'CLI needs to fail 0');
});
