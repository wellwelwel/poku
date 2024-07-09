import { env } from 'node:process';
import { poku, test, describe, it, assert } from '../src/modules/index.js';
import { isWindows } from '../src/parsers/get-runner.js';
import { inspectCLI } from './helpers/capture-cli.test.js';

test(async () => {
  await describe('CLI', async () => {
    await it('Sequential (Just Touch)', async () => {
      const results = await inspectCLI(
        'npx tsx src/bin/index.ts --platform=node --include=test/integration/import.test.ts'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Parallel (Just Touch)', async () => {
      const results = await inspectCLI(
        'npx tsx src/bin/index.ts --platform=node --parallel --include=test/integration/import.test.ts'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Parallel (FILTER Env)', async () => {
      const results = await inspectCLI(
        'npx tsx src/bin/index.ts --platform=node --parallel --include=test/integration',
        {
          env: { ...process.env, FILTER: 'import' },
        }
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Sequential + Options (Just Touch)', async () => {
      const results = await inspectCLI(
        isWindows
          ? 'npx tsx src/bin/index.ts --concurrency=4 --platform=node --fast-fail --debug --exclude=".bak" --kill-port=4000 --kill-range="4000-4001" --include=test/integration/import.test.ts --filter=".test.|.spec."'
          : 'npx tsx src/bin/index.ts --concurrency=4 --platform=node --fast-fail --debug --exclude=.bak --kill-port=4000 --kill-range=4000-4001 --include=test/integration/import.test.ts --filter=.test.|.spec.'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Parallel + Options (Just Touch)', async () => {
      const results = await inspectCLI(
        isWindows
          ? 'npx tsx src/bin/index.ts --parallel --concurrency=4 --platform=node --fast-fail --debug --exclude=".bak" --kill-port=4000 --kill-range="4000-4001" --include=test/integration/import.test.ts --filter=".test.|.spec."'
          : 'npx tsx src/bin/index.ts --parallel --concurrency=4 --platform=node --fast-fail --debug --exclude=.bak --kill-port=4000 --kill-range=4000-4001 --include=test/integration/import.test.ts --filter=.test.|.spec.'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Parallel + Options (CLI Env Variables Propagation)', async () => {
      const results = await inspectCLI(
        isWindows
          ? 'npx tsx src/bin/index.ts --include=test/integration/env --env-file="fixtures/.env.test"'
          : 'npx tsx src/bin/index.ts --include=test/integration/env --env-file=fixtures/.env.test',
        {
          env: {
            ...env,
            MY_VAR: 'Poku',
          },
        }
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
          concurrency: 4,
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
