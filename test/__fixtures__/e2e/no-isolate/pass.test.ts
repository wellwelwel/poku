import { assert } from '../../../../src/modules/essentials/assert.js';
import { test } from '../../../../src/modules/helpers/test.js';

test('in-process pass', () => {
  assert.strictEqual(1 + 1, 2, 'Math works');
});
