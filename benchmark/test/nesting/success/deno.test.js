import assert from 'node:assert';
import { resolve } from '../resolve.js';

for (let i = 0; i < 100; i++) {
  Deno.test(`Suite ${i}`, async (t) => {
    await t.step(`L1a ${i}`, async () => assert.ok(await resolve(true)));
    await t.step(`L1b ${i}`, async () => assert.ok(await resolve(true)));

    await t.step(`Nested ${i}`, async (t) => {
      await t.step(`L2a ${i}`, async () => assert.ok(await resolve(true)));
      await t.step(`L2b ${i}`, async () => assert.ok(await resolve(true)));

      await t.step(`Deep ${i}`, async (t) => {
        await t.step(`L3a ${i}`, async () => assert.ok(await resolve(true)));
        await t.step(`L3b ${i}`, async () => assert.ok(await resolve(true)));
      });
    });
  });
}
