import { poku, test, describe, it, assert } from '../src/modules/index.js';
import { isWindows } from '../src/parsers/get-runner.js';
import { inspectCLI } from './helpers/capture-cli.test.js';

console.log('\n😴 It will be really slow (press "Ctrl + C" twice to cancel)\n');

test(async () => {
  await describe('CLI', async () => {
    await it('Sequential (Unit)', async () => {
      const results = await inspectCLI(
        'npx tsx src/bin/index.ts --platform=node --include=test/unit'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Parallel (Unit)', async () => {
      const results = await inspectCLI(
        'npx tsx src/bin/index.ts --platform=node --parallel --include=test/unit'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Parallel + Unit + Options', async () => {
      const results = await inspectCLI(
        isWindows
          ? 'npx tsx src/bin/index.ts --parallel --concurrency=4 --platform=node --fast-fail --debug --exclude=".bak" --kill-port=4000 --kill-range="4000-4001" --include=test/unit --filter=".test.|.spec."'
          : 'npx tsx src/bin/index.ts --parallel --concurrency=4 --platform=node --fast-fail --debug --exclude=.bak --kill-port=4000 --kill-range=4000-4001 --include=test/unit --filter=.test.|.spec.'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });
  });

  await describe('API', async () => {
    await it('Sequential (Unit)', async () => {
      const exitCode = await poku(['test/unit'], {
        platform: 'node',
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Sequential (File)', async () => {
      const exitCode = await poku('test/integration/import.test.ts', {
        platform: 'node',
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Parallel (File)', async () => {
      const exitCode = await poku('test/integration/import.test.ts', {
        platform: 'node',
        parallel: true,
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Parallel (Unit)', async () => {
      const exitCode = await poku(['test/unit'], {
        platform: 'node',
        parallel: true,
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Parallel + All + Options', async () => {
      const exitCode = await poku(
        ['test/unit', 'test/integration', 'test/e2e'],
        {
          platform: 'node',
          parallel: true,
          debug: true,
          concurrency: 4,
          exclude: [/import.test/],
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
