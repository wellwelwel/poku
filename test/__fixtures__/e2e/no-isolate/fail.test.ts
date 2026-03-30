import { assert } from '../../../../src/modules/essentials/assert.js';
import { test } from '../../../../src/modules/helpers/test.js';

test('in-process fail', () => {
  assert.strictEqual(1, 2, 'Intentional failure');
});
