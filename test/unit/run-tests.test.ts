import { assert } from '../../src/index.js';
import { runTests } from '../../src/services/run-tests.js';

(async () => {
  {
    const code = await runTests('./test/fixtures/fail', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, false, 'Failure test directory case');
  }

  {
    const code = await runTests('./test/fixtures/success', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, true, 'Success test directory case');
  }
})();
