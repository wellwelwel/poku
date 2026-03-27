import assert from 'node:assert';
import { describe, it } from 'node:test';

for (let i = 0; i < 100; i++) {
  describe(`Suite ${i}`, () => {
    it(`L1a ${i}`, () => assert.ok(true));
    it(`L1b ${i}`, () => assert.ok(true));

    describe(`Nested ${i}`, () => {
      it(`L2a ${i}`, () => assert.ok(true));
      it(`L2b ${i}`, () => assert.ok(true));

      describe(`Deep ${i}`, () => {
        it(`L3a ${i}`, () => assert.ok(true));
        it(`L3b ${i}`, () => assert.ok(true));
      });
    });
  });
}
