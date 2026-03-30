import { assert, assertEquals, assertStrictEquals } from '@std/assert';

Deno.test('assertions', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 1_000; i++) {
    assert(true);
    assertStrictEquals(i, i);
    assertEquals(a, b);
  }
});
