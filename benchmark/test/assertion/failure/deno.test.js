import { assert, assertEquals, assertStrictEquals } from '@std/assert';

Deno.test('ok', () => {
  assert(false);
});
Deno.test('strictEqual', () => {
  assertStrictEquals(0, 1);
});
Deno.test('deepStrictEqual', () => {
  assertEquals({ x: 1 }, { x: 2 });
});
