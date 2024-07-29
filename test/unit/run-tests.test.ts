import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { runTests } from '../../src/services/run-tests.js';

describe('Service: runTests', async () => {
  await Promise.all([
    it(async () => {
      const code = await runTests('./fixtures/fail', {
        noExit: true,
        quiet: true,
      });

      assert.deepStrictEqual(code, false, 'Failure test directory case');
    }),

    it(async () => {
      const code = await runTests('./fixtures/success', {
        noExit: true,
        quiet: true,
      });

      assert.deepStrictEqual(code, true, 'Success test directory case');
    }),
  ]);
});
