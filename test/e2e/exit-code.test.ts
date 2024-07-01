import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { poku } from '../../src/modules/essentials/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';

describe('Poku Runner Suite', async () => {
  await Promise.all([
    it(async () => {
      const code = await poku(['./fixtures/success', 'fixtures/fail'], {
        noExit: true,
        quiet: true,
      });

      assert.deepStrictEqual(code, 1, 'Testing all paths as a string array');
    }),

    it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        quiet: true,
      });

      assert.deepStrictEqual(code, 1, 'Testing a fail path as string');
    }),

    it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        quiet: true,
      });

      assert.deepStrictEqual(code, 0, 'Testing a success path as string');
    }),

    it(async () => {
      const code = await poku(['./fixtures/success'], {
        noExit: true,
        quiet: true,
      });

      assert.deepStrictEqual(code, 0);
    }),

    it(async () => {
      const code = await poku(['./fixtures/success', 'fixtures/fail'], {
        noExit: true,
        filter: /success/,
        quiet: true,
      });

      assert.deepStrictEqual(code, 0, 'Filter paths that contains "success"');
    }),

    it(async () => {
      const code = await poku(['./fixtures/success', 'fixtures/fail'], {
        noExit: true,
        filter: /fail/,
        quiet: true,
      });

      assert.deepStrictEqual(code, 1, 'Filter paths that contains "fail"');
    }),

    it(async () => {
      const code = await poku(['fixtures/fail'], {
        noExit: true,
        filter: /success/,
        quiet: true,
      });

      assert.deepStrictEqual(code, 0, 'No files (success filter)');
    }),

    it(async () => {
      const code = await poku(['./fixtures/success', 'fixtures/fail'], {
        noExit: true,
        filter: /\.(m)?(j|t)?s$/,
        quiet: true,
      });

      assert.deepStrictEqual(code, 1, 'Filter by extension');
    }),
  ]);
});
