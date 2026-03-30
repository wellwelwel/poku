import assert from 'node:assert';
import { describe, it } from 'bun:test';

for (let i = 0; i < 50; i++) {
  describe(`Suite ${i} (pass)`, () => {
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
for (let i = 0; i < 50; i++) {
  describe(`Suite ${i} (fail)`, () => {
    it(`L1a ${i}`, () => assert.ok(false));
    it(`L1b ${i}`, () => assert.ok(false));
    describe(`Nested ${i}`, () => {
      it(`L2a ${i}`, () => assert.ok(false));
      it(`L2b ${i}`, () => assert.ok(false));
      describe(`Deep ${i}`, () => {
        it(`L3a ${i}`, () => assert.ok(false));
        it(`L3b ${i}`, () => assert.ok(false));
      });
    });
  });
}
