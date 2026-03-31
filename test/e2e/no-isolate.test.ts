import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) skip();

describe('--isolation=none', async () => {
  await it('passing test via CLI flag', async () => {
    const results = await inspectPoku(
      '--debug --isolation=none --filter=pass',
      {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      }
    );

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Exit code needs to be 0');
  });

  await it('failing test via CLI flag', async () => {
    const results = await inspectPoku(
      '--debug --isolation=none --filter=fail',
      {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('detects process.exitCode failure', async () => {
    const results = await inspectPoku(
      '--debug --isolation=none --filter=exit-code',
      {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('timeout via CLI flag', async () => {
    const results = await inspectPoku(
      '--debug --isolation=none --filter=timeout --timeout=500',
      {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('quiet mode via CLI flag', async () => {
    const results = await inspectPoku(
      '--quiet --isolation=none --filter=pass',
      {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 0, 'Exit code needs to be 0');
    assert.strictEqual(results.stdout, '', 'No output in quiet mode');
  });

  await it('top-level throw', async () => {
    const results = await inspectPoku('throw.test.ts --isolation=none', {
      cwd: 'test/__fixtures__/e2e/no-isolate',
    });

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('beforeEach failure', async () => {
    const results = await inspectPoku(
      'before-each-fail.test.ts --isolation=none',
      {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('afterEach failure', async () => {
    const results = await inspectPoku(
      'after-each-fail.test.ts --isolation=none',
      {
        cwd: 'test/__fixtures__/e2e/no-isolate',
      }
    );

    assert.strictEqual(results.exitCode, 1, 'Exit code needs to be 1');
  });

  await it('via config file', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/no-isolate-config',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Exit code needs to be 0');
    assert(
      /isolation.+none/.test(results.stdout),
      'CLI needs to have "isolation" set to "none"'
    );
  });
});
