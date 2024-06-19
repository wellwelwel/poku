import process from 'node:process';
import { nodeVersion } from '../../src/helpers/get-runtime.js';

if (nodeVersion && nodeVersion < 14) process.exit(0);

import { join } from 'node:path';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { it } from '../../src/modules/it.js';
import { describe } from '../../src/modules/describe.js';
import { beforeEach, afterEach } from '../../src/modules/each.js';
import { assert } from '../../src/modules/assert.js';
import {
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
        new Set([normalizePath('test-tests/example.test.js')]),
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
        normalizePath('test-src/example.js'),
        new Set([normalizePath('test-tests/example.test.js')]),
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
        `
      ),
      new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']),
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
      ]),
      'require'
    );
  });
});
