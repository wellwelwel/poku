import assert from 'assert';
import { runTestFile } from '../../src/services/runTestFile.js';

const isProduction = process.env.NODE_ENV === 'production';
const ext = isProduction ? 'js' : 'ts';

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
