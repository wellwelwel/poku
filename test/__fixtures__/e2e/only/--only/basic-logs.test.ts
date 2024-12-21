import { assert } from '../../../../../src/modules/essentials/assert.js';
import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it/core.js';

(async () => {
  describe('1', () => {
    it('2', () => {
      assert(true);
    });

    it.only('3', () => {
      assert(true);
    });
  });

  describe.only('4', () => {
    assert(true);
  });

  it.only('5', () => {
    assert(true);
  });

  describe('6', () => {
    it('7', () => {
      assert(true);
    });
  });

  describe.only('8', () => {
    it('9', () => {
      assert(true);
    });

    it('10', () => {
      assert(true);
    });

    it('11', () => {
      assert(true);
    });
  });

  describe('12', () => {
    it('13', () => {
      assert(true);
    });

    it('14', () => {
      assert(true);
    });
  });

  describe.only('15', () => {
    it('16', () => {
      assert(true);
    });

    it.only('17', () => {
      assert(true);
    });

    it('18', () => {
      assert(true);
    });
  });

  await describe.only('19', async () => {
    await it('20', async () => {
      await Promise.resolve(true);
      assert(true);
    });

    await it('21', async () => {
      await Promise.resolve(true);
      assert(true);
    });

    await it('22', async () => {
      await Promise.resolve(true);
      assert(true);
    });
  });

  await describe.only('23', async () => {
    await it('24', async () => {
      await Promise.resolve(true);
      assert(true);
    });

    await it.only('25', async () => {
      await Promise.resolve(true);
      assert(true);
    });

    await it('26', async () => {
      await Promise.resolve(true);
      assert(true);
    });
  });
})();
