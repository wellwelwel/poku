import { test, expect } from 'vitest';
import { sum } from '../../src/sum.js';

test('should add 2 + 2', () => {
  expect(sum(2, 2)).toBe(4);
});
