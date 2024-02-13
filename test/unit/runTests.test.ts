import assert from 'assert';
import { runTests } from '../../src/services/runTests.js';

(async () => {
  {
    const code = await runTests('./test/fixtures/fail', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, false);
  }

  // Testing a success path as string
  {
    const code = await runTests('./test/fixtures/success', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, true);
  }
})();
