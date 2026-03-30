import assert from 'node:assert';
import { describe, it } from 'node:test';
import { resolve } from '../resolve.js';

for (let i = 0; i < 100; i++) {
  describe(`Suite ${i}`, () => {
    it(`L1a ${i}`, async () => assert.ok(await resolve(true)));
    it(`L1b ${i}`, async () => assert.ok(await resolve(true)));

    describe(`Nested ${i}`, () => {
      it(`L2a ${i}`, async () => assert.ok(await resolve(true)));
      it(`L2b ${i}`, async () => assert.ok(await resolve(true)));

      describe(`Deep ${i}`, () => {
        it(`L3a ${i}`, async () => assert.ok(await resolve(true)));
        it(`L3b ${i}`, async () => assert.ok(await resolve(true)));
      });
    });
  });
}
