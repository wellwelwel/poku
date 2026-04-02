import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { isFile } from '../../src/modules/helpers/list-files.js';
import { test } from '../../src/modules/helpers/test.js';

test(async () => {
  await describe('isFile', async () => {
    await it('should return true for existing files', async () => {
      assert.strictEqual(await isFile('package.json'), true);
    });

    await it('should throw for non-existent paths', async () => {
      await assert.rejects(() => isFile('non-existent-file-xyz'));
    });
  });
});
