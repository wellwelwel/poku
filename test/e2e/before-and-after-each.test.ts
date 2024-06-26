import { test } from '../../src/modules/test.js';
import { describe } from '../../src/modules/describe.js';
import { it } from '../../src/modules/it.js';
import { poku } from '../../src/modules/poku.js';
import { assert } from '../../src/modules/assert.js';

test(async () => {
  const prepareService = () => new Promise((resolve) => resolve(undefined));
  const resetService = () => new Promise((resolve) => resolve(undefined));
  // const crashIt = () => new Promise((_, reject) => reject("Let's crash it"));

  await describe('Before and After Each: direct methods', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        quiet: true,
        beforeEach: prepareService,
        afterEach: resetService,
      });

      assert.equal(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        quiet: true,
        beforeEach: prepareService,
        afterEach: resetService,
      });

      assert.equal(code, 1, 'beforeEach and afterEach hooks with failing path');
    });
  });

  await describe('Before and After Each: called methods', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        quiet: true,
        beforeEach: () => prepareService(),
        afterEach: () => resetService(),
      });

      assert.equal(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        quiet: true,
        beforeEach: () => prepareService(),
        afterEach: () => resetService(),
      });

      assert.equal(code, 1, 'beforeEach and afterEach hooks with failing path');
    });
  });

  await describe('Before and After Each: await called methods', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        quiet: true,
        beforeEach: async () => await prepareService(),
        afterEach: async () => await resetService(),
      });

      assert.equal(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        quiet: true,
        beforeEach: async () => await prepareService(),
        afterEach: async () => await resetService(),
      });

      assert.equal(code, 1, 'beforeEach and afterEach hooks with failing path');
    });
  });

  await describe('Before and After Each: anonymous methods', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        quiet: true,
        beforeEach: () => true,
        afterEach: () => true,
      });

      assert.equal(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        quiet: true,
        beforeEach: () => true,
        afterEach: () => true,
      });

      assert.equal(code, 1, 'beforeEach and afterEach hooks with failing path');
    });
  });

  await describe('Before and After Each: anonymous methods (function)', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        quiet: true,
        // biome-ignore lint/complexity/useArrowFunction: <test>
        beforeEach: function () {
          return;
        },
        // biome-ignore lint/complexity/useArrowFunction: <test>
        afterEach: function () {
          return;
        },
      });

      assert.equal(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        quiet: true,
        // biome-ignore lint/complexity/useArrowFunction: <test>
        beforeEach: function () {
          return;
        },
        // biome-ignore lint/complexity/useArrowFunction: <test>
        afterEach: function () {
          return;
        },
      });

      assert.equal(code, 1, 'beforeEach and afterEach hooks with failing path');
    });
  });
});
