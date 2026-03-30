import { assert, describe, it, test } from 'poku';

test('flat ok', () => assert.ok(true));
test('flat strictEqual', () => assert.strictEqual(1, 1));
test('flat deepStrictEqual', () => assert.deepStrictEqual({ x: 1 }, { x: 1 }));

describe('Suite', () => {
  it('ok', () => assert.ok(true));
  it('equal', () => assert.strictEqual(1, 1));

  describe('Nested', () => {
    it('ok', () => assert.ok(true));
    it('deep', () => assert.deepStrictEqual({ x: 1 }, { x: 1 }));

    describe('Deep', () => {
      it('ok', () => assert.ok(true));
      it('equal', () => assert.strictEqual(1, 1));
    });
  });
});
