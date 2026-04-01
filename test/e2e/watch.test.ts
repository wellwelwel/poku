import { readFile, writeFile } from 'node:fs/promises';
import { isBuild, watchCLI } from '../__utils__/capture-cli.test.js';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { skip } from '../../src/modules/helpers/skip.js';
import {
  sleep,
  waitForExpectedResult,
} from '../../src/modules/helpers/wait-for.js';
import { isWindows } from '../../src/parsers/os.js';

if (isBuild || isWindows || GLOBAL.runtime === 'deno') skip();

const saveFileUnchanged = async (filename: string) => {
  const data = await readFile(filename, 'utf8');

  await writeFile(filename, data, 'utf8');
};

describe('Watch Mode', async () => {
  const watcher = watchCLI('--watchInterval=500', {
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
  ]);

  await waitForExpectedResult(() => {
    const results = watcher.getOutput();

    return /test\/a\.test\.ts/.test(results.stdout);
  }, true);

  const countRuns = (output: string) =>
    output.split('\n').filter((line) => /test\/a\.test\.ts/.test(line)).length;

  const runsAfterFirst = countRuns(watcher.getOutput().stdout);

  await saveFileUnchanged('test/__fixtures__/e2e/watch/test/a.test.ts');
  await sleep(200);

  const runsAfterImmediate = countRuns(watcher.getOutput().stdout);

  await sleep(1000);

  await saveFileUnchanged('test/__fixtures__/e2e/watch/test/a.test.ts');

  await waitForExpectedResult(() => {
    const runs = countRuns(watcher.getOutput().stdout);

    return runs > runsAfterFirst;
  }, true);

  const results = watcher.getOutput();
  await watcher.kill();

  it('Top path', () => {
    const watched = results.stdout
      .split('\n')
      .filter((result) => /test\/a\.test\.ts/.test(result)).length;

    assert(watched >= 1);
  });

  it('Sub path', () => {
    const watched = results.stdout
      .split('\n')
      .filter((result) => /test\/sub\/b\.test\.ts/.test(result)).length;

    assert(watched >= 1);
  });

  it('Respects watchInterval debounce', () => {
    assert.strictEqual(
      runsAfterImmediate,
      runsAfterFirst,
      'Expected rapid change to be debounced by watchInterval'
    );
  });
});

describe('Watch Mode Default Interval', async () => {
  const watcher = watchCLI('test', {
    cwd: 'test/__fixtures__/e2e/watch',
  });

  await waitForExpectedResult(() => {
    const results = watcher.getOutput();

    return /Watching:/.test(results.stdout);
  }, true);

  await sleep(100);

  await saveFileUnchanged('test/__fixtures__/e2e/watch/test/a.test.ts');

  await waitForExpectedResult(() => {
    const results = watcher.getOutput();

    return /test\/a\.test\.ts/.test(results.stdout);
  }, true);

  const results = watcher.getOutput();
  await watcher.kill();

  it('Uses default interval', () => {
    assert(/Watching:/.test(results.stdout), 'Expected "Watching:" in stdout');
  });
});
