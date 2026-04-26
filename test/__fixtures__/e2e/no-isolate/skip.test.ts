import { assert } from '../../../../src/modules/essentials/assert.js';
import { skip } from '../../../../src/modules/helpers/skip.js';
import { test } from '../../../../src/modules/helpers/test.js';

skip('Skipping this file');

test('should not run', () => {
  assert.strictEqual(true, false, 'This test must not execute');
});
