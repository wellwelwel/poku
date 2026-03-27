import assert from 'node:assert';
import { describe, it, test } from 'node:test';

test('flat ok', () => {
  assert.ok(false);
});

test('flat strictEqual', () => {
  assert.strictEqual(0, 1);
});

test('flat deepStrictEqual', () => {
  assert.deepStrictEqual({ x: 1 }, { x: 2 });
});

for (let i = 0; i < 3; i++) {
  describe(`Suite ${i}`, () => {
    it(`ok ${i}`, () => assert.ok(false));
    it(`equal ${i}`, () => assert.strictEqual(0, 1));

    describe(`Nested ${i}`, () => {
      it(`ok ${i}`, () => assert.ok(false));
      it(`deep ${i}`, () => assert.deepStrictEqual({ x: 1 }, { x: 2 }));

      describe(`Deep ${i}`, () => {
        it(`ok ${i}`, () => assert.ok(false));
        it(`equal ${i}`, () => assert.strictEqual(0, 1));
      });
    });
  });
}
