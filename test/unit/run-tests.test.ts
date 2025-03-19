import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { listFiles } from '../../src/modules/helpers/list-files.js';
import { runTests } from '../../src/services/run-tests.js';

GLOBAL.configs.noExit = true;
GLOBAL.configs.quiet = true;

describe('Service: runTests', async () => {
  await Promise.all([
    it(async () => {
      const code = await runTests(
        await listFiles('test/__fixtures__/e2e/fail')
      );

      assert.deepStrictEqual(code, false, 'Failure test directory case');
    }),

    it(async () => {
      const code = await runTests(
        await listFiles('test/__fixtures__/e2e/success')
      );

      assert.deepStrictEqual(code, true, 'Success test directory case');
    }),
  ]);
});
