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

    const actual = results.stdout.split('\n');
    const offset =
      actual.findIndex((line) => line.includes('Running Tests')) + 1;

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');

    assert.match(actual[offset + 1], /1/);
    assert.match(actual[offset + 2], /3/);
    assert.match(actual[offset + 3], /3/);
    assert.match(actual[offset + 4], /1/);

    assert.match(actual[offset + 5], /4/);
    assert.match(actual[offset + 6], /4/);
    assert.match(actual[offset + 7], /5/);
    assert.match(actual[offset + 8], /5/);

    assert.match(actual[offset + 9], /8/);
    assert.match(actual[offset + 10], /9/);
    assert.match(actual[offset + 11], /9/);
    assert.match(actual[offset + 12], /10/);
    assert.match(actual[offset + 13], /10/);
    assert.match(actual[offset + 14], /11/);
    assert.match(actual[offset + 15], /11/);
    assert.match(actual[offset + 16], /8/);

    assert.match(actual[offset + 17], /15/);
    assert.match(actual[offset + 18], /17/);
    assert.match(actual[offset + 19], /17/);
    assert.match(actual[offset + 20], /15/);

    assert.match(actual[offset + 21], /19/);
    assert.match(actual[offset + 22], /20/);
    assert.match(actual[offset + 23], /20/);
    assert.match(actual[offset + 24], /21/);
    assert.match(actual[offset + 25], /21/);
    assert.match(actual[offset + 26], /22/);
    assert.match(actual[offset + 27], /22/);
    assert.match(actual[offset + 28], /19/);

    assert.match(actual[offset + 29], /23/);
    assert.match(actual[offset + 30], /25/);
    assert.match(actual[offset + 31], /25/);
    assert.match(actual[offset + 32], /23/);
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

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
  });
});
