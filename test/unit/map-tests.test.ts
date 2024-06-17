import process from 'node:process';
import { nodeVersion } from '../../src/helpers/get-runtime.js';

if (nodeVersion && nodeVersion < 14) process.exit(0);

import { join } from 'node:path';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { it } from '../../src/modules/it.js';
import { describe } from '../../src/modules/describe.js';
import { beforeEach, afterEach } from '../../src/modules/each.js';
import { assert } from '../../src/modules/assert.js';
import { mapTests, normalizePath } from '../../src/services/map-tests.js';

const createFileSync = (filePath: string, content: string) => {
  writeFileSync(filePath, content);
};

const createDirSync = (dirPath: string) => {
  mkdirSync(dirPath, { recursive: true });
};

const removeDirSync = (dirPath: string) => {
  rmSync(dirPath, { recursive: true, force: true });
};

const testSrcDir = 'test-src';
const testTestDir = 'test-tests';

describe('mapTests', async () => {
  beforeEach(() => {
    createDirSync(testSrcDir);
    createDirSync(testTestDir);
    createFileSync(join(testSrcDir, 'example.js'), 'export const foo = 42;');
    createFileSync(
      join(testTestDir, 'example.test.js'),
      'import { foo } from "../test-src/example.js";'
    );
  });

  afterEach(() => {
    removeDirSync(testSrcDir);
    removeDirSync(testTestDir);
  });

  await it('should map test files to their corresponding source files', async () => {
    const importMap = await mapTests(testSrcDir, [testTestDir]);

    const expected = new Map([
      [
        normalizePath('test-src/example.js'),
        [normalizePath('test-tests/example.test.js')],
      ],
    ]);

    assert.deepStrictEqual(importMap, expected);
  });

  await it('should map single test file correctly', async () => {
    const singleTestFile = join(testTestDir, 'example.test.js');
    const importMap = await mapTests(testSrcDir, [singleTestFile]);

    const expected = new Map([
      [
        normalizePath('test-src/example.js'),
        [normalizePath('test-tests/example.test.js')],
      ],
    ]);

    assert.deepStrictEqual(importMap, expected);
  });
});
