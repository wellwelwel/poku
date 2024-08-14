import { nodeVersion } from '../../src/parsers/get-runtime.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (nodeVersion && nodeVersion < 14) {
  skip();
}

import { join } from 'node:path';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { test } from '../../src/modules/helpers/test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { beforeEach, afterEach } from '../../src/modules/helpers/each.js';
import { assert } from '../../src/modules/essentials/assert.js';
import {
  findMatchingFiles,
  getDeepImports,
  mapTests,
  normalizePath,
} from '../../src/services/map-tests.js';

const createFileSync = (filePath: string, content: string) => {
  writeFileSync(filePath, content);
};

const createDirSync = (dirPath: string) => {
  mkdirSync(dirPath, { recursive: true });
};

const removeDirSync = (dirPath: string) => {
  rmSync(dirPath, { recursive: true, force: true });
};

const testSrcDir = 'test/__fixtures__/.temp/map-tests';
const testTestDir = 'test/__fixtures__/.temp/map-tests/test-tests';

test(async () => {
  await describe('Map Tests', async () => {
    beforeEach(() => {
      createDirSync(testSrcDir);
      createDirSync(testTestDir);
      createFileSync(join(testSrcDir, 'example.js'), 'export const foo = 42;');
      createFileSync(
        join(testTestDir, 'example.test.js'),
        'import { foo } from "../map-tests/example.js";'
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
          normalizePath('test/__fixtures__/.temp/map-tests/example.js'),
          new Set([
            normalizePath(
              'test/__fixtures__/.temp/map-tests/test-tests/example.test.js'
            ),
          ]),
        ],
      ]);

      assert.deepStrictEqual(
        importMap,
        expected,
        'Check if tests are correctly mapped to their corresponding source files.'
      );
    });

    await it('should map single test file correctly', async () => {
      const singleTestFile = join(testTestDir, 'example.test.js');
      const importMap = await mapTests(testSrcDir, [singleTestFile]);

      const expected = new Map([
        [
          normalizePath('test/__fixtures__/.temp/map-tests/example.js'),
          new Set([
            normalizePath(
              'test/__fixtures__/.temp/map-tests/test-tests/example.test.js'
            ),
          ]),
        ],
      ]);

      assert.deepStrictEqual(
        importMap,
        expected,
        'Check if a test file is correctly mapped to its corresponding source file.'
      );
    });

    it('Deep Imports', () => {
      assert.deepStrictEqual(
        getDeepImports(
          `
          import some from 'some-a';
          import * as some from 'some-b';
          import * as some from './a';
          import { some } from './b';
          import * as some from './c.js';
          import { some } from './d.js';
          import * as some from './e.ts';
          import { some } from './f.ts';
          import * as some from './g.cjs';
          import { some } from './h.cjs';
          import * as some from './i.mjs';
          import { some } from './j.mjs';
          import './k';
          import './l.js';
          import('./m.js');
          import {
            moduleA,
            moduleB,
          } from 'some-c';
          import {
            moduleA,
            moduleB,
          } from './n.js';
          import '../../o.js';
          import {
            moduleA,
            moduleB,
          } from '../p.js';
          import('../q.js');
          `
        ),
        new Set([
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
        ]),
        'import'
      );

      assert.deepStrictEqual(
        getDeepImports(
          `
          const some = require('some-a');
          const some = require('some-b');
          const some = require('./a');
          const { some } = require('./b');
          const some = require('./c.js');
          const { some } = require('./d.js');
          const some = require('./e.ts');
          const { some } = require('./f.ts');
          const some = require('./g.cjs');
          const { some } = require('./h.cjs');
          const some = require('./i.mjs');
          const { some } = require('./j.mjs');
          require('./k');
          require('./l.js');
          require('./m.js').default;
          const { some } = require('../../../n.mjs');
          `
        ),
        new Set([
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
        ]),
        'require'
      );
    });
  });

  describe('Match Files', () => {
    it('should find matching files based on normalized paths', () => {
      const srcFilesWithoutExt = new Set([
        'src/utils/helper',
        'src/components/button',
      ]);
      const srcFilesWithExt = new Set([
        'src/utils/helper.js',
        'src/utils/helper.ts',
        'src/components/button.jsx',
        'src/components/button.test.js',
      ]);

      const matchingFiles = findMatchingFiles(
        srcFilesWithoutExt,
        srcFilesWithExt
      );

      const expected = new Set([
        normalizePath('src/utils/helper.js'),
        normalizePath('src/utils/helper.ts'),
        normalizePath('src/components/button.jsx'),
        normalizePath('src/components/button.test.js'),
      ]);

      assert.deepStrictEqual(
        matchingFiles,
        expected,
        'Check if matching files are correctly identified.'
      );
    });

    it('should return an empty set if no matching files are found', () => {
      const srcFilesWithoutExt = new Set([
        'src/services/api',
        'src/components/card',
      ]);
      const srcFilesWithExt = new Set([
        'src/utils/helper.js',
        'src/utils/helper.ts',
        'src/components/button.jsx',
      ]);

      const matchingFiles = findMatchingFiles(
        srcFilesWithoutExt,
        srcFilesWithExt
      );

      assert.deepStrictEqual(
        matchingFiles,
        new Set(),
        'Check if an empty set is returned when no matching files are found.'
      );
    });

    it('should handle cases where file paths contain special characters', () => {
      const srcFilesWithoutExt = new Set([
        'src/utils/@helper',
        'src/components/button',
      ]);
      const srcFilesWithExt = new Set([
        'src/utils/@helper.js',
        'src/utils/@helper.ts',
        'src/components/button.jsx',
      ]);

      const matchingFiles = findMatchingFiles(
        srcFilesWithoutExt,
        srcFilesWithExt
      );

      const expected = new Set([
        normalizePath('src/utils/@helper.js'),
        normalizePath('src/utils/@helper.ts'),
        normalizePath('src/components/button.jsx'),
      ]);

      assert.deepStrictEqual(
        matchingFiles,
        expected,
        'Check if matching files with special characters in paths are correctly identified.'
      );
    });
  });
});
