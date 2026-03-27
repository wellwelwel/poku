import assert from 'node:assert';
import { describe, it } from 'mocha';

for (let i = 0; i < 100; i++) {
  describe(`Suite ${i}`, function () {
    it(`L1a ${i}`, function () {
      assert.ok(false);
    });
    it(`L1b ${i}`, function () {
      assert.ok(false);
    });

    describe(`Nested ${i}`, function () {
      it(`L2a ${i}`, function () {
        assert.ok(false);
      });
      it(`L2b ${i}`, function () {
        assert.ok(false);
      });

      describe(`Deep ${i}`, function () {
        it(`L3a ${i}`, function () {
          assert.ok(false);
        });
        it(`L3b ${i}`, function () {
          assert.ok(false);
        });
      });
    });
  });
}
