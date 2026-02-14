import { join } from 'node:path';
import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';

const basePath = join('test', '__fixtures__', 'e2e', 'shared-resources');

describe('Shared Resources', async () => {
  await it('Parallel tests', async () => {
    const results = await inspectPoku('--debug --sharedResources --concurrency=0', {
      cwd: `${basePath}/parallel`,
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 4/.test(results.stdout), 'CLI needs to pass 4');
    assert(/FAIL › 0/.test(results.stdout), 'CLI needs to fail 0');
  });

  await it('Error tests', async () => {
    const results = await inspectPoku('--debug --sharedResources', {
      cwd: `${basePath}/error`,
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Exit Code needs to be 1');
    assert(/FAIL › 1/.test(results.stdout), 'CLI needs to fail 1');
  });

  await it('No flag tests', async () => {
    const results = await inspectPoku('--debug', {
      cwd: `${basePath}/no-flag`,
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Exit Code needs to be 1');
    assert(/FAIL › 1/.test(results.stdout), 'CLI needs to fail 1');
  });
});
