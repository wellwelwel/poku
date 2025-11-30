import { join } from 'node:path';
import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (GLOBAL.runtime === 'deno') skip();

const finalPath = join('test', '__fixtures__', 'e2e', 'shared-resources');

describe('Shared Resources', async () => {
  const results = await inspectPoku('--debug --sharedResources', {
    cwd: finalPath,
  });

  if (results.exitCode !== 0) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  assert(/PASS › 2/.test(results.stdout), 'CLI needs to pass 2');
  assert(/FAIL › 0/.test(results.stdout), 'CLI needs to fail 0');
});
