import assert from 'node:assert';
import { describe, it } from 'mocha';

for (let i = 0; i < 50; i++) {
  describe(`Suite ${i} (pass)`, function () {
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

for (let i = 0; i < 50; i++) {
  describe(`Suite ${i} (fail)`, function () {
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
