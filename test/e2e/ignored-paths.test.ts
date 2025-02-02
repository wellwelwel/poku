import { accessSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { isWindows } from '../../src/parsers/os.js';

if (isWindows) skip();

const base = 'test/__fixtures__/.temp/ignored-paths';

const createTestFile = (dirName: string) => {
  const baseDir = join(base, dirName);
  const filePath = join(baseDir, 'a.test.js');

  try {
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

  const results = await inspectPoku('', {
    cwd: base,
  });

  assert.doesNotMatch(results.stdout, /PASS ›/, 'Needs to pass 0');
  assert.doesNotMatch(results.stdout, /FAIL ›/, 'Needs to fail 0');

  rmSync(base, { force: true, recursive: true });
});
