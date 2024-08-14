import { rmSync } from 'node:fs';
import { poku, test, describe, it, assert } from '../src/modules/index.js';
import { isWindows } from '../src/parsers/get-runner.js';
import { inspectPoku } from './__utils__/capture-cli.test.js';

test(async () => {
  const toRemove = ['test/__fixtures__/.temp'];

  for (const path of toRemove) {
    try {
      rmSync(path, { force: true, recursive: true });
    } catch {}
  }

  await describe('CLI', async () => {
    await it('Sequential (Just Touch)', async () => {
      const results = await inspectPoku(
        '--platform=node test/integration/import.test.ts'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Parallel (Just Touch)', async () => {
      const results = await inspectPoku(
        '--platform=node --parallel test/integration/import.test.ts'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Parallel (FILTER Env)', async () => {
      const results = await inspectPoku(
        '--platform=node --parallel test/integration',
        {
          env: { ...process.env, FILTER: 'import' },
        }
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Sequential + Options (Just Touch)', async () => {
      const results = await inspectPoku(
        isWindows
          ? '--concurrency=4 --platform=node --fail-fast --debug --exclude=".bak" --kill-port=4000 --kill-range="4000-4001" test/integration/import.test.ts --filter=".test.|.spec."'
          : '--concurrency=4 --platform=node --fail-fast --debug --exclude=.bak --kill-port=4000 --kill-range=4000-4001 test/integration/import.test.ts --filter=.test.|.spec.'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Parallel + Options (Just Touch)', async () => {
      const results = await inspectPoku(
        isWindows
          ? '--parallel --concurrency=4 --platform=node --fail-fast --debug --exclude=".bak" --kill-port=4000 --kill-range="4000-4001" test/integration/import.test.ts --filter=".test.|.spec."'
          : '--parallel --concurrency=4 --platform=node --fail-fast --debug --exclude=.bak --kill-port=4000 --kill-range=4000-4001 test/integration/import.test.ts --filter=.test.|.spec.'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });
  });

  await describe('API', async () => {
    await it('Sequential (Single Input)', async () => {
      const exitCode = await poku('test/integration/import.test.ts', {
        platform: 'node',
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Parallel (Single Input)', async () => {
      const exitCode = await poku('test/integration/import.test.ts', {
        platform: 'node',
        parallel: true,
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Unit (Exclude as Regex)', async () => {
      const exitCode = await poku('test/unit', {
        platform: 'node',
        parallel: true,
        exclude: /watch|map-tests/,
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Unit (Exclude as Array of Regex)', async () => {
      const exitCode = await poku('test/unit', {
        platform: 'node',
        parallel: true,
        concurrency: 4,
        exclude: [/watch/, /map-tests/],
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Parallel + Unit + Integration + E2E + Options', async () => {
      const exitCode = await poku(
        ['test/unit', 'test/integration', 'test/e2e'],
        {
          platform: 'node',
          parallel: true,
          debug: true,
          filter: /\.(test|spec)\./,
          failFast: true,
          noExit: true,
        }
      );

      assert.strictEqual(exitCode, 0, 'Passed');
    });
  });

  console.log();
});
