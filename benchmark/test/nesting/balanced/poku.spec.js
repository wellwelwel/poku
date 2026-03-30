import assert from 'node:assert';
import { describe, it } from 'poku';
import { resolve } from '../resolve.js';

for (let i = 0; i < 50; i++) {
  await describe(`Suite ${i} (pass)`, async () => {
    await it(`L1a ${i}`, async () => assert.ok(await resolve(true)));
    await it(`L1b ${i}`, async () => assert.ok(await resolve(true)));

    await describe(`Nested ${i}`, async () => {
      await it(`L2a ${i}`, async () => assert.ok(await resolve(true)));
      await it(`L2b ${i}`, async () => assert.ok(await resolve(true)));

      await describe(`Deep ${i}`, async () => {
        await it(`L3a ${i}`, async () => assert.ok(await resolve(true)));
        await it(`L3b ${i}`, async () => assert.ok(await resolve(true)));
      });
    });
  });
}

for (let i = 0; i < 50; i++) {
  await describe(`Suite ${i} (fail)`, async () => {
    await it(`L1a ${i}`, async () => assert.ok(await resolve(false)));
    await it(`L1b ${i}`, async () => assert.ok(await resolve(false)));

    await describe(`Nested ${i}`, async () => {
      await it(`L2a ${i}`, async () => assert.ok(await resolve(false)));
      await it(`L2b ${i}`, async () => assert.ok(await resolve(false)));

      await describe(`Deep ${i}`, async () => {
        await it(`L3a ${i}`, async () => assert.ok(await resolve(false)));
        await it(`L3b ${i}`, async () => assert.ok(await resolve(false)));
      });
    });
  });
}
