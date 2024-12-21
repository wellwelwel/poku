import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { ext, inspectCLI, inspectPoku } from '../__utils__/capture-cli.test.js';
import { runner } from '../../src/parsers/get-runner.js';

describe('Only', async () => {
  const cmd = runner(`_.${ext}`).join(' ');

  await it('--only', async () => {
    const results = await inspectPoku('--only --debug', {
      cwd: 'test/__fixtures__/e2e/only/--only',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
  });

  await it('No Poku Runner', async () => {
    const results = await inspectCLI(
      `${cmd} ./test/__fixtures__/e2e/only/--only/basic-logs.test.${ext} --only`
    );

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
  });

  await it('Should fail without `--only`', async () => {
    const results = await inspectPoku('--debug', {
      cwd: 'test/__fixtures__/e2e/only/--only',
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Failed');
  });

  await it('No Poku Runner should fail without `--only` (describe)', async () => {
    const results = await inspectCLI(
      `${cmd} ./test/__fixtures__/e2e/only/describe.test.${ext}`
    );

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Failed');
  });

  await it('No Poku Runner should fail without `--only` (it)', async () => {
    const results = await inspectCLI(
      `${cmd} ./test/__fixtures__/e2e/only/it.test.${ext}`
    );

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Failed');
  });

  await it('No Poku Runner should fail without `--only`', async () => {
    const results = await inspectCLI(
      `${cmd} ./test/__fixtures__/e2e/only/--only/basic-logs.test.${ext}`
    );

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Failed');
  });

  await it('Check hooks when using .only modifier', async () => {
    const results = await inspectCLI(
      `${cmd} ./test/__fixtures__/e2e/only/hooks.test.${ext} --only`
    );

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
  });
});
