import { assert, assertEquals, assertStrictEquals } from '@std/assert';

Deno.test('ok (pass)', () => {
  for (let i = 0; i < 500; i++) assert(true);
});
Deno.test('strictEqual (pass)', () => {
  for (let i = 0; i < 500; i++) assertStrictEquals(i, i);
});
Deno.test('deepStrictEqual (pass)', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 500; i++) assertEquals(a, b);
});
Deno.test('ok (fail)', () => {
  assert(false);
});
Deno.test('strictEqual (fail)', () => {
  assertStrictEquals(0, 1);
});
Deno.test('deepStrictEqual (fail)', () => {
  assertEquals({ x: 1 }, { x: 2 });
});
