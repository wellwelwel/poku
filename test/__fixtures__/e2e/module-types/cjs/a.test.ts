import { assert } from '../../../../../src/modules/essentials/assert.js';
import { test } from '../../../../../src/modules/helpers/test.js';

test(() => {
  assert.match(__dirname, /cjs$/, 'Ensure dirname');
  assert.match(__filename, /a\.test\.ts$/, 'Ensure filename');
});
