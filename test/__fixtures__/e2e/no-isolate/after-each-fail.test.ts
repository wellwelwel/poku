import { afterEach, assert, test } from '../../../../src/modules/index.js';

afterEach(() => {
  throw new Error('afterEach failed');
});

test('passes but afterEach fails', () => {
  assert.ok(true);
});
