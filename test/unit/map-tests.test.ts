import process from 'node:process';
import { nodeVersion } from '../../src/helpers/get-runtime.js';

if (nodeVersion && nodeVersion < 14) process.exit(0);

import { join, posix } from 'node:path';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { it } from '../../src/modules/it.js';
import { describe } from '../../src/modules/describe.js';
import { beforeEach, afterEach } from '../../src/modules/each.js';
import { assert } from '../../src/modules/assert.js';
import { mapTests } from '../../src/services/map-tests.js';

const createFileSync = (filePath: string, content: string) => {
  writeFileSync(filePath, content);
};

const createDirSync = (dirPath: string) => {
  mkdirSync(dirPath, { recursive: true });
};

const removeDirSync = (dirPath: string) => {
  rmSync(dirPath, { recursive: true, force: true });
};

const normalizeImportMap = (
  importMap: Map<string, string[]>
): Map<string, string[]> => {
  const normalizedMap = new Map<string, string[]>();
  for (const [key, value] of importMap) {
    const normalizedKey = normalizePath(key);
    const normalizedValue = value.map((v) => normalizePath(v));
    normalizedMap.set(normalizedKey, normalizedValue);
  }
  return normalizedMap;
};

const normalizePath = (filePath: string): string => {
  return posix.normalize(filePath.replace(/\\/g, '/'));
};

const testSrcDir = 'test-src';
const testTestDir = 'test-tests';

beforeEach(() => {
  createDirSync(testSrcDir);
  createDirSync(testTestDir);
  createFileSync(join(testSrcDir, 'example.js'), 'export const foo = 42;');
  createFileSync(
    join(testTestDir, 'example.test.js'),
    'import { foo } from "../test-src/example.js";'
  );
  createFileSync(
    join(testTestDir, 'exampleAbsolute.test.js'),
    `import { foo } from "${posix.join(testSrcDir, 'example.js')}";`
  );
});

afterEach(() => {
  removeDirSync(testSrcDir);
  removeDirSync(testTestDir);
});

describe('mapTests', async () => {
  await it('should map test files to their corresponding source files', async () => {
    const importMap = await mapTests(testSrcDir, [testTestDir]);
    const expected = new Map([
      [
        normalizePath(join(testSrcDir, 'example.js')),
        [
          normalizePath(join(testTestDir, 'example.test.js')),
          normalizePath(join(testTestDir, 'exampleAbsolute.test.js')),
        ],
      ],
    ]);

    assert.deepStrictEqual(
      normalizeImportMap(importMap),
      normalizeImportMap(expected)
    );
  });

  await it('should map single test file correctly', async () => {
    const singleTestFile = join(testTestDir, 'example.test.js');
    const importMap = await mapTests(testSrcDir, [singleTestFile]);
    const expected = new Map([
      [
        normalizePath(join(testSrcDir, 'example.js')),
        [normalizePath(singleTestFile)],
      ],
    ]);

    assert.deepStrictEqual(
      normalizeImportMap(importMap),
      normalizeImportMap(expected)
    );
  });

  await it('should include files that reference the normalized path directly', async () => {
    const importMap = await mapTests(testSrcDir, [testTestDir]);
    const expected = new Map([
      [
        normalizePath(join(testSrcDir, 'example.js')),
        [
          normalizePath(join(testTestDir, 'example.test.js')),
          normalizePath(join(testTestDir, 'exampleAbsolute.test.js')),
        ],
      ],
    ]);

    assert.deepStrictEqual(
      normalizeImportMap(importMap),
      normalizeImportMap(expected)
    );
  });
});
