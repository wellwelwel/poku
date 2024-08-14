import { getRuntime, nodeVersion } from '../../src/parsers/get-runtime.js';
import { isBuild, watchCLI } from '../__utils__/capture-cli.test.js';
import { isWindows } from '../../src/parsers/get-runner.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (
  isBuild ||
  (nodeVersion && nodeVersion < 10) ||
  getRuntime() !== 'node' ||
  isWindows
) {
  skip();
}

import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import {
  sleep,
  waitForExpectedResult,
} from '../../src/modules/helpers/wait-for.js';
import { readFile, writeFile } from 'node:fs/promises';

const saveFileUnchanged = async (filename: string) => {
  const data = await readFile(filename, 'utf8');

  await writeFile(filename, data, 'utf8');
};

describe('Watch Mode', async () => {
  const watcher = watchCLI('--watch-interval=500', {
    cwd: 'test/__fixtures__/e2e/watch',
  });

  await waitForExpectedResult(() => {
    const results = watcher.getOutput();

    return /Watching:/.test(results.stdout);
  }, true);

  await sleep(100);

  await Promise.all([
    saveFileUnchanged('test/__fixtures__/e2e/watch/test/a.test.ts'),
    saveFileUnchanged('test/__fixtures__/e2e/watch/test/sub/b.test.ts'),
    saveFileUnchanged('test/__fixtures__/e2e/watch/test/a.test.ts'),
    saveFileUnchanged('test/__fixtures__/e2e/watch/test/sub/b.test.ts'),
  ]);

  await sleep(100);

  const results = watcher.getOutput();
  await watcher.kill();

  await it('Top path', async () => {
    const watched = results.stdout
      .split('\n')
      .filter((result) => /test\/a\.test\.ts/.test(result)).length;

    assert(watched >= 2);
  });

  await it('Sub path', async () => {
    const watched = results.stdout
      .split('\n')
      .filter((result) => /test\/sub\/b\.test\.ts/.test(result)).length;

    assert(watched >= 2);
  });
});
