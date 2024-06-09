import { describe } from '../../src/modules/describe.js';
import { test } from '../../src/modules/test.js';
import { assert } from '../../src/modules/assert.js';
import { runTests } from '../../src/services/run-tests.js';

describe('Service: runTests', { icon: '🔬' });

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
