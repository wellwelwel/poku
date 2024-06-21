import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import { it } from '../../src/modules/it.js';
import { describe } from '../../src/modules/describe.js';
import { beforeEach, afterEach } from '../../src/modules/each.js';
import { assert } from '../../src/modules/assert.js';
import { getRuntime, nodeVersion } from '../../src/helpers/get-runtime.js';
import { watch, WatchCallback } from '../../src/services/watch.js';

if (nodeVersion && nodeVersion < 10) process.exit(0);

const runtime = getRuntime();

const tmpDir = path.resolve('.', '.temp');

const createTempDir = () => {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  fs.writeFileSync(path.join(tmpDir, 'file1.test.js'), 'export default {};');
  fs.writeFileSync(path.join(tmpDir, 'file2.test.js'), 'export default {};');
};

const cleanTempDir = () => {
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
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

    await new Promise((resolve) => {
      setTimeout(() => {
        fs.writeFileSync(filePath, 'export default { updated: true };'); // update
        resolve(undefined);
      }, 500);
    });

    return await new Promise((resolve) => {
      setTimeout(() => {
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
        resolve(undefined);
      }, 500);
    });
  });

  await it('should watch for new files in directory', async () => {
    if (runtime === 'bun') return;
    if (runtime === 'deno') return;

    callbackResults = [];

    const watcher = await watch(tmpDir, callback);
    const newFilePath = path.join(tmpDir, 'file3.test.js');

    fs.writeFileSync(newFilePath, ''); // create (empty)

    await new Promise((resolve) => {
      setTimeout(() => {
        fs.writeFileSync(newFilePath, 'export default {};'); // update
        resolve(undefined);
      }, 500);
    });

    return await new Promise((resolve) => {
      setTimeout(() => {
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
        resolve(undefined);
      }, 500);
    });
  });

  await it('should stop watching files', async () => {
    callbackResults = [];
    const watcher = await watch(tmpDir, callback);
    watcher.stop();
    const filePath = path.join(tmpDir, 'file1.test.js');
    fs.writeFileSync(filePath, 'export default { stopped: true };');

    return await new Promise((resolve) => {
      setTimeout(() => {
        assert.strictEqual(
          callbackResults.length,
          0,
          'Callback should not be called after watcher is stopped'
        );
        resolve(undefined);
      }, 500);
    });
  });

  await it('should watch for changes in subdirectories', async () => {
    if (runtime === 'bun') return;
    if (runtime === 'deno') return;

    callbackResults = [];
    const watcher = await watch(tmpDir, callback);
    const subDirPath = path.join(tmpDir, 'subdir');
    const newFilePath = path.join(subDirPath, 'file4.test.js');

    fs.mkdirSync(subDirPath);
    fs.writeFileSync(newFilePath, ''); // create (empty)

    await new Promise((resolve) => {
      setTimeout(() => {
        fs.writeFileSync(newFilePath, 'export default {};'); // update
        resolve(undefined);
      }, 500);
    });

    return new Promise((resolve) => {
      setTimeout(() => {
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
        resolve(undefined);
      }, 500);
    });
  });

  await it('should watch for changes in nested subdirectories', async () => {
    if (runtime === 'bun') return;
    if (runtime === 'deno') return;

    callbackResults = [];
    const watcher = await watch(tmpDir, callback);
    const nestedSubDirPath = path.join(tmpDir, 'subdir', 'nestedsubdir');
    const newNestedFilePath = path.join(nestedSubDirPath, 'file5.test.js');

    fs.mkdirSync(nestedSubDirPath, { recursive: true });
    fs.writeFileSync(newNestedFilePath, '');

    await new Promise((resolve) => {
      setTimeout(() => {
        fs.writeFileSync(newNestedFilePath, 'export default {};'); // update
        resolve(undefined);
      }, 500);
    });

    return await new Promise((resolve) => {
      setTimeout(() => {
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
        resolve(undefined);
      }, 500);
    });
  });

  await it('should watch a single file directly', async () => {
    if (runtime === 'bun') return;

    callbackResults = [];
    const filePath = path.join(tmpDir, 'file1.test.js');

    fs.writeFileSync(filePath, '');

    const watcher = await watch(filePath, callback);

    await new Promise((resolve) => {
      setTimeout(() => {
        fs.writeFileSync(filePath, 'export default {};');
        resolve(undefined);
      }, 500);
    });

    return await new Promise((resolve) => {
      setTimeout(() => {
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
        resolve(undefined);
      }, 500);
    });
  });
});
