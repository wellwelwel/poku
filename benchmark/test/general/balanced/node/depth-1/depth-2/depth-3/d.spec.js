import assert from 'node:assert';
import { describe, it, test } from 'node:test';

test('flat ok', () => assert.ok(false));
test('flat strictEqual', () => assert.strictEqual(0, 1));
test('flat deepStrictEqual', () => assert.deepStrictEqual({ x: 1 }, { x: 2 }));

describe('Suite', () => {
  it('ok', () => assert.ok(false));
  it('equal', () => assert.strictEqual(0, 1));

  describe('Nested', () => {
    it('ok', () => assert.ok(false));
    it('deep', () => assert.deepStrictEqual({ x: 1 }, { x: 2 }));

    describe('Deep', () => {
      it('ok', () => assert.ok(false));
      it('equal', () => assert.strictEqual(0, 1));
    });
  });
});
