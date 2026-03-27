import { assert, test } from 'poku';

test('ok', () => {
  assert.ok(false);
});

test('strictEqual', () => {
  assert.strictEqual(0, 1);
});

test('deepStrictEqual', () => {
  assert.deepStrictEqual({ x: 1 }, { x: 2 });
});
