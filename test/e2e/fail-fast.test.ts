import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { nodeVersion } from '../../src/parsers/get-runtime.js';

// TODO: fix exit code when using failFast

if (isBuild || (nodeVersion && nodeVersion < 16)) {
  skip();
}

describe('Fast Fast', async () => {
  await it('Parallel / Concurrent', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/fail-fast/parallel',
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    // assert.strictEqual(results.exitCode, 1, 'Failed');
    assert.match(results.stderr, /fail-fast/, 'Fail Fast is enabled');
    assert.match(results.stdout, /FAIL › 1/, 'Needs to fail 1');
  });

  await it('Sequential', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/fail-fast/sequential',
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    // assert.strictEqual(results.exitCode, 1, 'Failed');
    assert.match(results.stdout, /fail-fast/, 'Fail Fast is enabled');
    assert.match(results.stdout, /FAIL › 1/, 'Needs to fail 1');
  });
});
