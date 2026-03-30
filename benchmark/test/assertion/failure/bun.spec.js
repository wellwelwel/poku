import { expect, test } from 'bun:test';

test('ok', () => {
  expect(false).toBeTruthy();
});
test('strictEqual', () => {
  expect(0).toBe(1);
});
test('deepStrictEqual', () => {
  expect({ x: 1 }).toStrictEqual({ x: 2 });
});
