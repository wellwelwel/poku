import type { WatchCallback } from '../../src/@types/watch.js';
import fs from 'node:fs';
import path from 'node:path';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { afterEach, beforeEach } from '../../src/modules/helpers/each.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { sleep } from '../../src/modules/helpers/wait-for.js';
import { runtimeVersion } from '../../src/parsers/runtime-version.js';
import { watch } from '../../src/services/watch.js';

const { runtime } = GLOBAL;

if (runtime === 'deno') skip();
if (runtime === 'node' && runtimeVersion < 16)
  skip('rmSync is available from Node.js 16 onwards');

const tmpDir = path.resolve('.', 'test/__fixtures__/.temp/watch');
const humanDelay = 750;

const createTempDir = () => {
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  fs.writeFileSync(path.join(tmpDir, 'file1.test.js'), 'export default {};');
  fs.writeFileSync(path.join(tmpDir, 'file2.test.js'), 'export default {};');
};

const cleanTempDir = () => {
  if (fs.existsSync(tmpDir))
    fs.rmSync(tmpDir, { recursive: true, force: true });
};

describe('Watcher Service', async () => {
  let callbackResults: { file: string; event: string }[] = [];

  const callback: WatchCallback = (file, event) => {
    callbackResults.push({ file, event });
  };

  beforeEach(() => {
    createTempDir();
    callbackResults = [];
  });

  afterEach(() => {
    callbackResults = [];
    cleanTempDir();
  });

  await it('should watch for file changes', async () => {
    callbackResults = [];
    const watcher = await watch(tmpDir, callback);
    const filePath = path.join(tmpDir, 'file1.test.js');

    fs.writeFileSync(filePath, 'export default {};');

    await sleep(humanDelay);

    fs.writeFileSync(filePath, 'export default { updated: true };'); // update

    await sleep(humanDelay);

    assert(
      callbackResults.length > 0,
      'Callback should be called on file change'
    );
    assert(
      callbackResults.some(
        (result) => result.file === filePath && result.event === 'change'
      ),
      'Callback should capture the correct file and event type'
    );

    watcher.stop();
  });

  await it('should watch for new files in directory', async () => {
    if (runtime === 'deno' || runtime === 'bun') {
      return;
    }

    callbackResults = [];

    const watcher = await watch(tmpDir, callback);
    const newFilePath = path.join(tmpDir, 'file3.test.js');

    fs.writeFileSync(newFilePath, ''); // create (empty)

    await sleep(humanDelay);

    fs.writeFileSync(newFilePath, 'export default {};'); // update

    await sleep(humanDelay);

    assert(
      callbackResults.length > 0,
      'Callback should be called on new file creation'
    );
    assert(
      callbackResults.some(
        (result) => result.file === newFilePath && result.event === 'change'
      ),
      'Callback should capture the correct file and event type'
    );

    watcher.stop();
  });

  await it('should stop watching files', async () => {
    callbackResults = [];
    const watcher = await watch(tmpDir, callback);
    watcher.stop();
    const filePath = path.join(tmpDir, 'file1.test.js');
    fs.writeFileSync(filePath, 'export default { stopped: true };');

    await sleep(humanDelay);

    assert.strictEqual(
      callbackResults.length,
      0,
      'Callback should not be called after watcher is stopped'
    );
  });

  await it('should watch for changes in subdirectories', async () => {
    if (runtime === 'deno' || runtime === 'bun') {
      return;
    }

    callbackResults = [];
    const watcher = await watch(tmpDir, callback);
    const subDirPath = path.join(tmpDir, 'subdir');
    const newFilePath = path.join(subDirPath, 'file4.test.js');

    fs.mkdirSync(subDirPath);

    await sleep(humanDelay);

    fs.writeFileSync(newFilePath, ''); // create (empty)

    await sleep(humanDelay);

    fs.writeFileSync(newFilePath, 'export default {};'); // update

    await sleep(humanDelay);

    assert(
      callbackResults.length > 0,
      'Callback should be called on new directory creation'
    );
    assert(
      callbackResults.some(
        (result) => result.file === newFilePath && result.event === 'change'
      ),
      'Callback should capture the correct file and event type'
    );

    watcher.stop();
  });

  await it('should watch for changes in nested subdirectories', async () => {
    if (runtime === 'bun') {
      return;
    }

    callbackResults = [];
    const watcher = await watch(tmpDir, callback);
    const nestedSubDirPath = path.join(tmpDir, 'subdir', 'nestedsubdir');
    const newNestedFilePath = path.join(nestedSubDirPath, 'file5.test.js');

    await sleep(humanDelay);

    fs.mkdirSync(nestedSubDirPath, { recursive: true });

    await sleep(humanDelay);

    fs.writeFileSync(newNestedFilePath, '');

    await sleep(humanDelay);

    fs.writeFileSync(newNestedFilePath, 'export default {};'); // update

    await sleep(humanDelay);

    assert(
      callbackResults.length > 0,
      'Callback should be called on new nested directory creation'
    );
    assert(
      callbackResults.some(
        (result) =>
          result.file === newNestedFilePath && result.event === 'change'
      ),
      'Callback should capture the correct file and event type'
    );

    watcher.stop();
  });

  await it('should watch a single file directly', async () => {
    if (runtime === 'bun') {
      return;
    }

    callbackResults = [];
    const filePath = path.join(tmpDir, 'file1.test.js');

    fs.writeFileSync(filePath, '');

    const watcher = await watch(filePath, callback);

    await sleep(humanDelay);

    fs.writeFileSync(filePath, 'export default {};');

    await sleep(humanDelay);

    assert(
      callbackResults.length > 0,
      'Callback should be called on direct file change'
    );
    assert(
      callbackResults.some(
        (result) => result.file === filePath && result.event === 'change'
      ),
      'Callback should capture the correct file and event type'
    );

    watcher.stop();
  });
});
