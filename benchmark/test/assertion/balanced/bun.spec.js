import { expect, test } from 'bun:test';

test('ok (pass)', () => {
  for (let i = 0; i < 500; i++) expect(true).toBeTruthy();
});
test('strictEqual (pass)', () => {
  for (let i = 0; i < 500; i++) expect(i).toBe(i);
});
test('deepStrictEqual (pass)', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 500; i++) expect(a).toStrictEqual(b);
});
test('ok (fail)', () => {
  expect(false).toBeTruthy();
});
test('strictEqual (fail)', () => {
  expect(0).toBe(1);
});
test('deepStrictEqual (fail)', () => {
  expect({ x: 1 }).toStrictEqual({ x: 2 });
});
