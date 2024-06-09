import { assert } from 'chai';
import { test } from 'mocha';
import { sum } from '../../src/sum.js';

test('should add 2 + 2', () => {
  assert.equal(sum(2, 2), 4);
});
