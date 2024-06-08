import { test, assert } from 'poku';
import { sum } from '../../src/sum.js';

test(() => {
  assert.equal(sum(4, 4), 4, 'should add 4 + 4');
});
