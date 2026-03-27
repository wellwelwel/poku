import { assert, test } from 'poku';

test('ok (pass)', () => {
  for (let i = 0; i < 500; i++) assert.ok(true);
});

test('strictEqual (pass)', () => {
  for (let i = 0; i < 500; i++) assert.strictEqual(i, i);
});

test('deepStrictEqual (pass)', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 500; i++) assert.deepStrictEqual(a, b);
});

test('ok (fail)', () => {
  assert.ok(false);
});

test('strictEqual (fail)', () => {
  assert.strictEqual(0, 1);
});

test('deepStrictEqual (fail)', () => {
  assert.deepStrictEqual({ x: 1 }, { x: 2 });
});
