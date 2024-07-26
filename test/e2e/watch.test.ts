import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { watchCLI, isProduction } from '../helpers/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';
import {
  sleep,
  waitForExpectedResult,
} from '../../src/modules/helpers/wait-for.js';
import { readFile, writeFile } from 'node:fs/promises';

if (isProduction) {
  skip();
}

const saveFileUnchanged = async (filename: string) => {
  const data = await readFile(filename, 'utf-8');

  await writeFile(filename, data, 'utf-8');
};

describe('Watch Mode', async () => {
  const watcher = watchCLI(
    'bun ../../src/bin/index.ts -w --watch-interval=500',
    {
      cwd: './fixtures/watch',
    }
  );

  await waitForExpectedResult(() => {
    const results = watcher.getOutput();

    return /Watching:/.test(results.stdout);
  }, true);

  await Promise.all([
    saveFileUnchanged('./fixtures/watch/test/a.test.ts'),
    saveFileUnchanged('./fixtures/watch/test/sub/b.test.ts'),
    saveFileUnchanged('./fixtures/watch/test/a.test.ts'),
    saveFileUnchanged('./fixtures/watch/test/sub/b.test.ts'),
  ]);

  await sleep(100);

  const results = watcher.getOutput();
  await watcher.kill();

  await it('Top path', async () => {
    const watched = results.stdout
      .split('\n')
      .filter((result) => /test\/a\.test\.ts/.test(result)).length;

    assert(watched >= 4);
  });

  await it('Sub path', async () => {
    const watched = results.stdout
      .split('\n')
      .filter((result) => /test\/sub\/b\.test\.ts/.test(result)).length;

    assert(watched >= 4);
  });
});
