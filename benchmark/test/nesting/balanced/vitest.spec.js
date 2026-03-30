import assert from 'node:assert';
import { describe, it } from 'vitest';
import { resolve } from '../resolve.js';

for (let i = 0; i < 50; i++) {
  describe(`Suite ${i} (pass)`, () => {
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

for (let i = 0; i < 50; i++) {
  describe(`Suite ${i} (fail)`, () => {
    it(`L1a ${i}`, async () => assert.ok(await resolve(false)));
    it(`L1b ${i}`, async () => assert.ok(await resolve(false)));

    describe(`Nested ${i}`, () => {
      it(`L2a ${i}`, async () => assert.ok(await resolve(false)));
      it(`L2b ${i}`, async () => assert.ok(await resolve(false)));

      describe(`Deep ${i}`, () => {
        it(`L3a ${i}`, async () => assert.ok(await resolve(false)));
        it(`L3b ${i}`, async () => assert.ok(await resolve(false)));
      });
    });
  });
}
