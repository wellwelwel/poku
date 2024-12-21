import { assert } from '../../../../../src/modules/essentials/assert.js';
import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it/core.js';

(async () => {
  describe(() => {
    it(() => {
      assert(true);
    });

    it.only(() => {
      assert(true);
    });
  });

  describe.only(() => {
    assert(true);
  });

  it.only(() => {
    assert(true);
  });

  describe(() => {
    it(() => {
      assert(true);
    });
  });

  describe.only(() => {
    it(() => {
      assert(true);
    });

    it(() => {
      assert(true);
    });

    it(() => {
      assert(true);
    });
  });

  describe(() => {
    it(() => {
      assert(true);
    });

    it(() => {
      assert(true);
    });
  });

  describe.only(() => {
    it(() => {
      assert(true);
    });

    it.only(() => {
      assert(true);
    });

    it(() => {
      assert(true);
    });
  });

  await describe.only(async () => {
    await it(async () => {
      await Promise.resolve(true);
      assert(true);
    });

    await it(async () => {
      await Promise.resolve(true);
      assert(true);
    });

    await it(async () => {
      await Promise.resolve(true);
      assert(true);
    });
  });

  await describe.only(async () => {
    await it(async () => {
      await Promise.resolve(true);
      assert(true);
    });

    await it.only(async () => {
      await Promise.resolve(true);
      assert(true);
    });

    await it(async () => {
      await Promise.resolve(true);
      assert(true);
    });
  });
})();
