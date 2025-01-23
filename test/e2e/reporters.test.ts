import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) {
  skip();
}

describe('Reporters', async () => {
  for (const flag of [
    '--reporter=poku',
    '-r=poku',
    '--reporter=verbose',
    '-r=verbose',
    '--reporter=classic',
    '-r=classic',
    '--reporter=dot',
    '-r=dot',
  ]) {
    await it(`Hybrid: ${flag}`, async () => {
      const output = await inspectPoku(flag, {
        cwd: 'test/__fixtures__/e2e/reporters/hybrid',
      });

      if (output.exitCode !== 1) {
        console.log(output.stdout);
        console.log(output.stderr);
      }

      assert.strictEqual(output.exitCode, 1, 'Failed');
      assert(/PASS › 4/.test(output.stdout), 'CLI needs to pass 4');
      assert(/FAIL › 2/.test(output.stdout), 'CLI needs to fail 2');
    });

    await it(`Success: ${flag}`, async () => {
      const output = await inspectPoku(flag, {
        cwd: 'test/__fixtures__/e2e/reporters/success',
      });

      if (output.exitCode !== 0) {
        console.log(output.stdout);
        console.log(output.stderr);
      }

      assert.strictEqual(output.exitCode, 0, 'Passed');
      assert(/PASS › 4/.test(output.stdout), 'CLI needs to pass 4');
      assert(/FAIL › 0/.test(output.stdout), 'CLI needs to fail 0');
    });

    await it(`Failure: ${flag}`, async () => {
      const output = await inspectPoku(flag, {
        cwd: 'test/__fixtures__/e2e/reporters/failure',
      });

      if (output.exitCode !== 1) {
        console.log(output.stdout);
        console.log(output.stderr);
      }

      assert.strictEqual(output.exitCode, 1, 'Failed');
      assert(/PASS › 0/.test(output.stdout), 'CLI needs to pass 0');
      assert(/FAIL › 4/.test(output.stdout), 'CLI needs to fail 4');
    });
  }

  for (const flag of [
    '--reporter=focus',
    '-r=focus',
    '--reporter=compact',
    '-r=compact',
  ]) {
    await it(`Hybrid: ${flag}`, async () => {
      const output = await inspectPoku(flag, {
        cwd: 'test/__fixtures__/e2e/reporters/hybrid',
      });

      if (output.exitCode !== 1) {
        console.log(output.stdout);
        console.log(output.stderr);
      }

      assert.strictEqual(output.exitCode, 1, 'Failed');
      assert(
        /4.+test file\(s\) passed/.test(output.stdout),
        'CLI needs to pass 4'
      );
      assert(
        /2.+test file\(s\) failed/.test(output.stdout),
        'CLI needs to fail 2'
      );
    });

    await it(`Success: ${flag}`, async () => {
      const output = await inspectPoku(flag, {
        cwd: 'test/__fixtures__/e2e/reporters/success',
      });

      if (output.exitCode !== 0) {
        console.log(output.stdout);
        console.log(output.stderr);
      }

      assert.strictEqual(output.exitCode, 0, 'Passed');
      assert(
        /4.+test file\(s\) passed/.test(output.stdout),
        'CLI needs to pass 4'
      );
      assert(
        /0.+test file\(s\) failed/.test(output.stdout),
        'CLI needs to fail 0'
      );
    });

    await it(`Failure: ${flag}`, async () => {
      const output = await inspectPoku(flag, {
        cwd: 'test/__fixtures__/e2e/reporters/failure',
      });

      if (output.exitCode !== 1) {
        console.log(output.stdout);
        console.log(output.stderr);
      }

      assert.strictEqual(output.exitCode, 1, 'Failed');
      assert(
        /0.+test file\(s\) passed/.test(output.stdout),
        'CLI needs to pass 0'
      );
      assert(
        /4.+test file\(s\) failed/.test(output.stdout),
        'CLI needs to fail 4'
      );
    });
  }
});
