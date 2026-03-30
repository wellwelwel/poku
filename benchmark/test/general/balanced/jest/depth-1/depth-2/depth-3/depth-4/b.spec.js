import { describe, expect, it, test } from '@jest/globals';

test('flat ok', () => expect(true).toBeTruthy());
test('flat strictEqual', () => expect(1).toBe(1));
test('flat deepStrictEqual', () => expect({ x: 1 }).toStrictEqual({ x: 1 }));

describe('Suite', () => {
  it('ok', () => expect(true).toBeTruthy());
  it('equal', () => expect(1).toBe(1));

  describe('Nested', () => {
    it('ok', () => expect(true).toBeTruthy());
    it('deep', () => expect({ x: 1 }).toStrictEqual({ x: 1 }));

    describe('Deep', () => {
      it('ok', () => expect(true).toBeTruthy());
      it('equal', () => expect(1).toBe(1));
    });
  });
});
