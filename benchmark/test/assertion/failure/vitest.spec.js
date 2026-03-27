import { expect, test } from 'vitest';

test('ok', () => {
  expect(false).toBeTruthy();
});

test('toBe', () => {
  expect(0).toBe(1);
});

test('toStrictEqual', () => {
  expect({ x: 1 }).toStrictEqual({ x: 2 });
});
