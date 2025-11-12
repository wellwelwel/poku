const { assert } = require('../../../../../src/modules/essentials/assert.js');
const { test } = require('../../../../../src/modules/helpers/test.js');

test(() => {
  assert.match(__dirname, /cjs$/, 'Ensure dirname');
  assert.match(__filename, /a\.test\.ts$/, 'Ensure filename');
});
