import assert from 'node:assert';
import { it } from 'mocha';

it('ok', () => {
  assert.ok(false);
});

it('strictEqual', () => {
  assert.strictEqual(0, 1);
});

it('deepStrictEqual', () => {
  assert.deepStrictEqual({ x: 1 }, { x: 2 });
});
