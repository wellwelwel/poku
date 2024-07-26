import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectCLI, isProduction } from '../helpers/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isProduction) {
  skip();
}

describe('Failure', async () => {
  await it('Sequential', async () => {
    const results = await inspectCLI('npx tsx ../../src/bin/index.ts', {
      cwd: './fixtures/fail',
    });

    assert.match(results.stdout, /FAIL › 5/, 'Needs to fail 5');
    assert.match(
      results.stdout,
      /Should fail/,
      'Needs to show custom message for "fail"'
    );
    assert.match(
      results.stdout,
      /If error test/,
      'Needs to show custom message for "ifError"'
    );
  });

  await it('Parallel / Concurrent', async () => {
    const results = await inspectCLI('npx tsx ../../src/bin/index.ts -p', {
      cwd: './fixtures/fail',
    });

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

  await it('Missing File', async () => {
    const results = await inspectCLI(
      'npx tsx ../../src/bin/index.ts ./foo/bar.js',
      {
        cwd: './fixtures/fail',
      }
    );

    assert.match(results.stderr, /ENOENT/, 'Needs to show error message"');
    assert.strictEqual(results.exitCode, 1, 'Exit Code needs to be 0');
  });

  await it('Wrong Sintax', async () => {
    const results = await inspectCLI(
      'npx tsx ../../src/bin/index.ts invalid-file.js',
      {
        cwd: './fixtures/sintax',
      }
    );

    // console.log(results.stdout);
    // console.log(results.stderr);

    assert.match(
      results.stdout,
      /SyntaxError/,
      'Needs to show sintax error message"'
    );
    assert.strictEqual(results.exitCode, 1, 'Exit Code needs to be 0');
  });
});
