import { describe, expect, it, test } from '@jest/globals';

test('flat ok', () => {
  expect(false).toBeTruthy();
});

test('flat strictEqual', () => {
  expect(0).toBe(1);
});

test('flat deepStrictEqual', () => {
  expect({ x: 1 }).toStrictEqual({ x: 2 });
});

for (let i = 0; i < 3; i++) {
  describe(`Suite ${i}`, () => {
    it(`ok ${i}`, () => expect(false).toBeTruthy());
    it(`equal ${i}`, () => expect(0).toBe(1));

    describe(`Nested ${i}`, () => {
      it(`ok ${i}`, () => expect(false).toBeTruthy());
      it(`deep ${i}`, () => expect({ x: 1 }).toStrictEqual({ x: 2 }));

      describe(`Deep ${i}`, () => {
        it(`ok ${i}`, () => expect(false).toBeTruthy());
        it(`equal ${i}`, () => expect(0).toBe(1));
      });
    });
  });
}
