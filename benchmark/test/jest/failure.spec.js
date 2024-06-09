import { expect, test } from '@jest/globals';
import { sum } from '../../src/sum.js';

test('should add 4 + 4', () => {
  expect(sum(4, 4)).toBe(4);
});
