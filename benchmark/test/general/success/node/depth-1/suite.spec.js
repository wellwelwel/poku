import assert from 'node:assert';
import { describe, it, test } from 'node:test';

test('flat ok', () => {
  for (let i = 0; i < 50; i++) assert.ok(true);
});

test('flat strictEqual', () => {
  for (let i = 0; i < 50; i++) assert.strictEqual(i, i);
});

test('flat deepStrictEqual', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 50; i++) assert.deepStrictEqual(a, b);
});

for (let i = 0; i < 3; i++) {
  describe(`Suite ${i}`, () => {
    it(`ok ${i}`, () => assert.ok(true));
    it(`equal ${i}`, () => assert.strictEqual(i, i));

    describe(`Nested ${i}`, () => {
      it(`ok ${i}`, () => assert.ok(true));
      it(`deep ${i}`, () => assert.deepStrictEqual({ x: i }, { x: i }));

      describe(`Deep ${i}`, () => {
        it(`ok ${i}`, () => assert.ok(true));
        it(`equal ${i}`, () => assert.strictEqual(i, i));
      });
    });
  });
}
