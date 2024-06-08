import { test, assert } from 'poku';
import { sum } from '../../src/sum.js';

test(() => {
  assert.equal(sum(2, 2), 4, 'should add 2 + 2');
});
