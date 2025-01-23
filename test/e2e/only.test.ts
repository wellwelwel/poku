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
    const offset = actual.findIndex((line) => line.includes('◌ 1'));

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');

    assert.match(actual[offset + 0], /1/);
    assert.match(actual[offset + 1], /3/);
    assert.match(actual[offset + 2], /3/);
    assert.match(actual[offset + 3], /1/);

    assert.match(actual[offset + 4], /4/);
    assert.match(actual[offset + 5], /4/);
    assert.match(actual[offset + 6], /5/);
    assert.match(actual[offset + 7], /5/);

    assert.match(actual[offset + 8], /8/);
    assert.match(actual[offset + 9], /9/);
    assert.match(actual[offset + 10], /9/);
    assert.match(actual[offset + 11], /10/);
    assert.match(actual[offset + 12], /10/);
    assert.match(actual[offset + 13], /11/);
    assert.match(actual[offset + 14], /11/);
    assert.match(actual[offset + 15], /8/);

    assert.match(actual[offset + 16], /15/);
    assert.match(actual[offset + 17], /17/);
    assert.match(actual[offset + 18], /17/);
    assert.match(actual[offset + 19], /15/);

    assert.match(actual[offset + 20], /19/);
    assert.match(actual[offset + 21], /20/);
    assert.match(actual[offset + 22], /20/);
    assert.match(actual[offset + 23], /21/);
    assert.match(actual[offset + 24], /21/);
    assert.match(actual[offset + 25], /22/);
    assert.match(actual[offset + 26], /22/);
    assert.match(actual[offset + 27], /19/);

    assert.match(actual[offset + 28], /23/);
    assert.match(actual[offset + 29], /25/);
    assert.match(actual[offset + 30], /25/);
    assert.match(actual[offset + 31], /23/);
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
