import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { GLOBAL } from '../../src/configs/poku.js';

const { runtime } = GLOBAL;

if (runtime === 'deno') skip();

describe('Failure', async () => {
  await it('Basic', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/fail',
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Failed');
    assert.match(results.stdout, /FAIL › 5/, 'Needs to fail 5');
    assert.match(
      results.stdout,
      /Should fail/,
      'Needs to show custom message fail'
    );
    assert.match(
      results.stdout,
      /If error test/,
      'Needs to show custom message for "ifError"'
    );
  });

  runtime === 'node' &&
    !isBuild &&
    (await it('Wrong Sintax', async () => {
      const results = await inspectPoku('invalid-file.js', {
        cwd: 'test/__fixtures__/e2e/sintax',
      });

      if (results.exitCode !== 1) {
        console.log(results.stdout);
        console.log(results.stderr);
      }

      assert.strictEqual(results.exitCode, 1, 'Failed');
      assert.match(
        results.stdout,
        /SyntaxError/,
        'Needs to show sintax error message"'
      );
      assert.strictEqual(results.exitCode, 1, 'Exit Code needs to be 0');
    }));

  await it('Missing File', async () => {
    const results = await inspectPoku('-d ./foo/bar.js', {
      cwd: 'test/__fixtures__/e2e/fail',
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Failed');
    assert.match(results.stderr, /ENOENT/, 'Needs to show error message"');
    assert.strictEqual(results.exitCode, 1, 'Exit Code needs to be 0');
  });
});
