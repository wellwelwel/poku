import { expect, test } from '@jest/globals';

test('assertions', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 1_000; i++) {
    expect(true).toBeTruthy();
    expect(i).toBe(i);
    expect(a).toStrictEqual(b);
  }
});
