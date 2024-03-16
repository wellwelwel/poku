import { assert, describe, test } from '../../src/index.js';
import { runTests } from '../../src/services/run-tests.js';

describe('Service: runTests', { background: false, icon: '🔬' });

test(async () => {
  const code = await runTests('./fixtures/fail', {
    noExit: true,
    quiet: true,
  });

  assert.deepStrictEqual(code, false, 'Failure test directory case');
});

test(async () => {
  const code = await runTests('./fixtures/success', {
    noExit: true,
    quiet: true,
  });

  assert.deepStrictEqual(code, true, 'Success test directory case');
});
