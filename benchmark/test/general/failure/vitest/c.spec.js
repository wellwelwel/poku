import { describe, expect, it, test } from 'vitest';

test('flat ok', () => expect(false).toBeTruthy());
test('flat strictEqual', () => expect(0).toBe(1));
test('flat deepStrictEqual', () => expect({ x: 1 }).toStrictEqual({ x: 2 }));

describe('Suite', () => {
  it('ok', () => expect(false).toBeTruthy());
  it('equal', () => expect(0).toBe(1));

  describe('Nested', () => {
    it('ok', () => expect(false).toBeTruthy());
    it('deep', () => expect({ x: 1 }).toStrictEqual({ x: 2 }));

    describe('Deep', () => {
      it('ok', () => expect(false).toBeTruthy());
      it('equal', () => expect(0).toBe(1));
    });
  });
});
