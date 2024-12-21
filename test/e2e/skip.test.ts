import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { ext, inspectPoku, inspectCLI } from '../__utils__/capture-cli.test.js';
import { runner } from '../../src/parsers/get-runner.js';

describe('Skip', async () => {
  const cmd = runner(`_.${ext}`).join(' ');

  await it('Using Poku', async () => {
    const results = await inspectPoku('--debug', {
      cwd: 'test/__fixtures__/e2e/skip',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
    assert.match(results.stdout, /PASS › 2/, 'Passed 2');
    assert.match(results.stdout, /FAIL › 0/, 'Failed 0');
    assert.match(results.stdout, /SKIP › 7/, 'Skipped 7');
  });

  await it('No Poku Runner (Modifier)', async () => {
    const results = await inspectCLI(
      `${cmd} ./test/__fixtures__/e2e/skip/skip-modifier.test.${ext}`
    );

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
  });

  await it('No Poku Runner (Helper)', async () => {
    const results = await inspectCLI(
      `${cmd} ./test/__fixtures__/e2e/skip/skip-helper.test.${ext}`
    );

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
  });
});
