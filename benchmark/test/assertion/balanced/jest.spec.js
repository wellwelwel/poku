import { expect, test } from '@jest/globals';

test('ok (pass)', () => {
  for (let i = 0; i < 500; i++) expect(true).toBeTruthy();
});

test('toBe (pass)', () => {
  for (let i = 0; i < 500; i++) expect(i).toBe(i);
});

test('toStrictEqual (pass)', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 500; i++) expect(a).toStrictEqual(b);
});

test('ok (fail)', () => {
  expect(false).toBeTruthy();
});

test('toBe (fail)', () => {
  expect(0).toBe(1);
});

test('toStrictEqual (fail)', () => {
  expect({ x: 1 }).toStrictEqual({ x: 2 });
});
