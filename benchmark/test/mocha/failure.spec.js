import { assert } from 'chai';
import { test } from 'mocha';
import { sum } from '../../src/sum.js';

test('should add 4 + 4', () => {
  assert.equal(sum(4, 4), 4);
});
