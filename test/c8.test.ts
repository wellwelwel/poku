import { rmSync } from 'node:fs';
import { GLOBAL } from '../src/configs/poku.js';
import { beforeEach } from '../src/modules/helpers/each.js';
import { assert, describe, it, poku, test } from '../src/modules/index.js';
import { isWindows } from '../src/parsers/os.js';
import { inspectPoku } from './__utils__/capture-cli.test.js';

beforeEach(() => {
  GLOBAL.configs = Object.create(null);
});

test(async () => {
  const toRemove = ['test/__fixtures__/.temp'];

  for (const path of toRemove) {
    try {
      rmSync(path, { force: true, recursive: true });
    } catch {}
  }

  await describe('CLI', async () => {
    await it('Just Touch', async () => {
      const results = await inspectPoku('test/integration/import.test.ts');

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('FILTER Env', async () => {
      const results = await inspectPoku('test/integration', {
        env: { ...process.env, FILTER: 'import' },
      });

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });

    await it('Options (Just Touch)', async () => {
      const results = await inspectPoku(
        isWindows
          ? '--concurrency=4 --failFast --debug --exclude=".bak" --killPort=4000 --killRange="4000-4001" test/integration/import.test.ts --filter=".test.|.spec."'
          : '--concurrency=4 --failFast --debug --exclude=.bak --killPort=4000 --killRange=4000-4001 test/integration/import.test.ts --filter=.test.|.spec.'
      );

      console.log(results.stdout);
      console.log(results.stderr);

      assert.strictEqual(results.exitCode, 0, 'Passed');
    });
  });

  await describe('API', async () => {
    await it('Single Input', async () => {
      const exitCode = await poku('test/integration/import.test.ts', {
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Unit (Exclude as Regex)', async () => {
      const exitCode = await poku('test/unit', {
        exclude: /watch|map-tests/,
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Unit (Exclude as Array of Regex)', async () => {
      const exitCode = await poku('test/unit', {
        concurrency: 4,
        exclude: [/watch/, /map-tests/],
        noExit: true,
      });

      assert.strictEqual(exitCode, 0, 'Passed');
    });

    await it('Unit + Integration + E2E + Options', async () => {
      const exitCode = await poku(
        ['test/unit', 'test/integration', 'test/e2e'],
        {
          debug: true,
          filter: /\.(test|spec)\./,
          failFast: true,
          noExit: true,
          sharedResources: true,
        }
      );

      assert.strictEqual(exitCode, 0, 'Passed');
    });
  });

  console.log();
});
