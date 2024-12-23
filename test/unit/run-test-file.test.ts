import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { runTestFile } from '../../src/services/run-test-file.js';
import { ext } from '../__utils__/capture-cli.test.js';
import { GLOBAL } from '../../src/configs/poku.js';

GLOBAL.configs.quiet = true;

describe('Service: runTestFile', async () => {
  await Promise.all([
    it(async () => {
      const code = await runTestFile(
        `test/__fixtures__/e2e/fail/exit.test.${ext}`
      );

      assert.deepStrictEqual(code, false, 'Failure test file case');
    }),

    it(async () => {
      const code = await runTestFile(
        `test/__fixtures__/e2e/success/exit.test.${ext}`
      );

      assert.deepStrictEqual(code, true, 'Success test file case');
    }),
  ]);
});
