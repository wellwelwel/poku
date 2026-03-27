import assert from 'node:assert';
import { it } from 'mocha';

it('ok (pass)', () => {
  for (let i = 0; i < 500; i++) assert.ok(true);
});

it('strictEqual (pass)', () => {
  for (let i = 0; i < 500; i++) assert.strictEqual(i, i);
});

it('deepStrictEqual (pass)', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 500; i++) assert.deepStrictEqual(a, b);
});

it('ok (fail)', () => {
  assert.ok(false);
});

it('strictEqual (fail)', () => {
  assert.strictEqual(0, 1);
});

it('deepStrictEqual (fail)', () => {
  assert.deepStrictEqual({ x: 1 }, { x: 2 });
});
