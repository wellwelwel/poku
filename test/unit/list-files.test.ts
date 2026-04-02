import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { isBuild } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import {
  getAllFiles,
  isFile,
  listFiles,
} from '../../src/modules/helpers/list-files.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { test } from '../../src/modules/helpers/test.js';

if (isBuild) skip();

const tempDir = 'test/__fixtures__/.temp/list-files-unit';

test(async () => {
  await describe('isFile', async () => {
    await it('should return true for existing files', async () => {
      assert.strictEqual(await isFile('package.json'), true);
    });

    await it('should throw for non-existent paths', async () => {
      await assert.rejects(() => isFile('non-existent-file-xyz'));
    });
  });

  await describe('getAllFiles: node_modules path is excluded', async () => {
    await it('should skip files inside node_modules (fullPath branch)', async () => {
      const nmDir = join(tempDir, 'node_modules', 'fake');
      mkdirSync(nmDir, { recursive: true });
      writeFileSync(join(nmDir, 'a.test.js'), '');

      const files = await getAllFiles(join(nmDir, 'a.test.js'));

      assert.strictEqual(files.size, 0, 'node_modules file should be excluded');

      rmSync(tempDir, { recursive: true, force: true });
    });
  });

  await describe('listFiles: exclude configs', async () => {
    await it('should accept a single RegExp as exclude config', async () => {
      mkdirSync(tempDir, { recursive: true });
      writeFileSync(join(tempDir, 'a.test.js'), '');
      writeFileSync(join(tempDir, 'b.test.js'), '');

      const files = await listFiles(tempDir, { exclude: /a\.test/ });

      assert.ok(!files.some((f) => f.includes('a.test')), 'a.test.js excluded');
      assert.ok(
        files.some((f) => f.includes('b.test')),
        'b.test.js included'
      );

      rmSync(tempDir, { recursive: true, force: true });
    });

    await it('should accept an array of RegExp as exclude config', async () => {
      mkdirSync(tempDir, { recursive: true });
      writeFileSync(join(tempDir, 'a.test.js'), '');
      writeFileSync(join(tempDir, 'b.test.js'), '');
      writeFileSync(join(tempDir, 'c.test.js'), '');

      const files = await listFiles(tempDir, {
        exclude: [/a\.test/, /b\.test/],
      });

      assert.ok(!files.some((f) => f.includes('a.test')), 'a.test.js excluded');
      assert.ok(!files.some((f) => f.includes('b.test')), 'b.test.js excluded');
      assert.ok(
        files.some((f) => f.includes('c.test')),
        'c.test.js included'
      );

      rmSync(tempDir, { recursive: true, force: true });
    });
  });
});
