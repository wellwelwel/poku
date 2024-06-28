import process from 'node:process';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { runTestFile } from '../../src/services/run-test-file.js';
import { getRuntime } from '../../src/parsers/get-runtime.js';

const isProduction = process.env.NODE_ENV === 'production';
const ext = getRuntime() === 'deno' ? 'ts' : isProduction ? 'js' : 'ts';

describe('Service: runTestFile', async () => {
  await Promise.all([
    it(async () => {
      const code = await runTestFile(`./fixtures/fail/exit.test.${ext}`, {
        quiet: true,
      });

      assert.deepStrictEqual(code, false, 'Failure test file case');
    }),

    it(async () => {
      const code = await runTestFile(`./fixtures/success/exit.test.${ext}`, {
        quiet: true,
      });

      assert.deepStrictEqual(code, true, 'Success test file case');
    }),
  ]);
});
