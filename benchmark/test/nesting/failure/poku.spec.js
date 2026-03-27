import assert from 'node:assert';
import { describe, it } from 'poku';

for (let i = 0; i < 100; i++) {
  describe(`Suite ${i}`, () => {
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
