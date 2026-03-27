import assert from 'node:assert';
import { describe, it } from 'mocha';

for (let i = 0; i < 100; i++) {
  describe(`Suite ${i}`, function () {
    it(`L1a ${i}`, function () {
      assert.ok(true);
    });
    it(`L1b ${i}`, function () {
      assert.ok(true);
    });

    describe(`Nested ${i}`, function () {
      it(`L2a ${i}`, function () {
        assert.ok(true);
      });
      it(`L2b ${i}`, function () {
        assert.ok(true);
      });

      describe(`Deep ${i}`, function () {
        it(`L3a ${i}`, function () {
          assert.ok(true);
        });
        it(`L3b ${i}`, function () {
          assert.ok(true);
        });
      });
    });
  });
}
