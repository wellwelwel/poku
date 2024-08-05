import { test } from '../../src/modules/helpers/test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { poku } from '../../src/modules/essentials/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { isProduction } from '../helpers/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isProduction) {
  skip();
}

test(async () => {
  const prepareService = () => new Promise((resolve) => resolve(undefined));
  const resetService = () => new Promise((resolve) => resolve(undefined));
  const crashIt = () => new Promise((_, reject) => reject("Let's crash it"));
  const crashItAgain = () => {
    throw new Error("Let's crash it");
  };

  await describe('Before and After Each: direct methods', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,

        beforeEach: prepareService,
        afterEach: resetService,
      });

      assert.strictEqual(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        beforeEach: prepareService,
        afterEach: resetService,
      });

      assert.strictEqual(
        code,
        1,
        'beforeEach and afterEach hooks with failing path'
      );
    });
  });

  await describe('Before and After Each: called methods', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        beforeEach: () => prepareService(),
        afterEach: () => resetService(),
      });

      assert.strictEqual(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        beforeEach: () => prepareService(),
        afterEach: () => resetService(),
      });

      assert.strictEqual(
        code,
        1,
        'beforeEach and afterEach hooks with failing path'
      );
    });
  });

  await describe('Before and After Each: await called methods', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        beforeEach: async () => await prepareService(),
        afterEach: async () => await resetService(),
      });

      assert.strictEqual(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        beforeEach: async () => await prepareService(),
        afterEach: async () => await resetService(),
      });

      assert.strictEqual(
        code,
        1,
        'beforeEach and afterEach hooks with failing path'
      );
    });
  });

  await describe('Before and After Each: anonymous methods', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        beforeEach: () => true,
        afterEach: () => true,
      });

      assert.strictEqual(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        beforeEach: () => true,
        afterEach: () => true,
      });

      assert.strictEqual(
        code,
        1,
        'beforeEach and afterEach hooks with failing path'
      );
    });
  });

  await describe('Before and After Each: anonymous methods (function)', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        beforeEach: function () {
          return;
        },
        afterEach: function () {
          return;
        },
      });

      assert.strictEqual(
        code,
        0,
        'beforeEach and afterEach hooks with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/fail', {
        noExit: true,
        beforeEach: function () {
          return;
        },
        afterEach: function () {
          return;
        },
      });

      assert.strictEqual(
        code,
        1,
        'beforeEach and afterEach hooks with failing path'
      );
    });
  });

  await describe('Before and After Each: Failure', async () => {
    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        beforeEach: crashIt,
        afterEach: resetService,
      });

      assert.strictEqual(
        code,
        1,
        'Rejects beforeEach hook with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        beforeEach: prepareService,
        afterEach: crashIt,
      });

      assert.strictEqual(
        code,
        1,
        'Rejects afterEach hook with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        beforeEach: crashItAgain,
        afterEach: resetService,
      });

      assert.strictEqual(
        code,
        1,
        'Throws beforeEach hook with successful path'
      );
    });

    await it(async () => {
      const code = await poku('./fixtures/success', {
        noExit: true,
        beforeEach: prepareService,
        afterEach: crashItAgain,
      });

      assert.strictEqual(code, 1, 'Throws afterEach hook with successful path');
    });
  });
});
