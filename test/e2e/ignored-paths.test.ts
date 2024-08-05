import { join } from 'node:path';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectCLI, isProduction } from '../helpers/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { accessSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

if (isProduction) {
  skip();
}

const createTestFile = (dirName: string) => {
  try {
    const baseDir = join('./fixtures/list-files', dirName);
    const filePath = join(baseDir, 'a.test.js');

    mkdirSync(baseDir, { recursive: true });

    try {
      accessSync(filePath);
    } catch {
      writeFileSync(filePath, '');
    }
  } catch {}
};

describe('List Files: node_modules and .git', async () => {
  createTestFile('.git');
  createTestFile('node_modules');

  await it('Sequential', async () => {
    const results = await inspectCLI('npx tsx ../../src/bin/index.ts', {
      cwd: './fixtures/list-files',
    });

    assert.doesNotMatch(results.stdout, /PASS ›/, 'Needs to pass 0');
    assert.doesNotMatch(results.stdout, /FAIL ›/, 'Needs to fail 0');
  });

  rmSync('./fixtures/list-files', { force: true, recursive: true });
});
