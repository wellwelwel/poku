import { assert, test } from 'poku';

test('assertions', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 1_000; i++) {
    assert.ok(true);
    assert.strictEqual(i, i);
    assert.deepStrictEqual(a, b);
  }
});
