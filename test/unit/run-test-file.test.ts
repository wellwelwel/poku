import process from 'node:process';
import { assert } from '../../src/index.js';
import { runTestFile } from '../../src/services/run-test-file.js';
import { getRuntime } from '../../src/helpers/get-runtime.js';

const isProduction = process.env.NODE_ENV === 'production';
const ext = getRuntime() === 'deno' ? 'ts' : isProduction ? 'js' : 'ts';

(async () => {
  {
    const code = await runTestFile(`./test/fixtures/fail/exit.test.${ext}`, {
      quiet: true,
    });

    assert.deepStrictEqual(code, false);
  }

  // Testing a success path as string
  {
    const code = await runTestFile(`./test/fixtures/success/exit.test.${ext}`, {
      quiet: true,
    });

    assert.deepStrictEqual(code, true);
  }
})();
