import { describe, expect, it, test } from '@jest/globals';

test('flat ok', () => {
  for (let i = 0; i < 50; i++) expect(true).toBeTruthy();
});

test('flat strictEqual', () => {
  for (let i = 0; i < 50; i++) expect(i).toBe(i);
});

test('flat deepStrictEqual', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 50; i++) expect(a).toStrictEqual(b);
});

for (let i = 0; i < 3; i++) {
  describe(`Suite ${i}`, () => {
    it(`ok ${i}`, () => expect(true).toBeTruthy());
    it(`equal ${i}`, () => expect(i).toBe(i));

    describe(`Nested ${i}`, () => {
      it(`ok ${i}`, () => expect(true).toBeTruthy());
      it(`deep ${i}`, () => expect({ x: i }).toStrictEqual({ x: i }));

      describe(`Deep ${i}`, () => {
        it(`ok ${i}`, () => expect(true).toBeTruthy());
        it(`equal ${i}`, () => expect(i).toBe(i));
      });
    });
  });
}
