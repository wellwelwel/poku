import { assert } from '../../src/modules/essentials/assert.js';
import { poku } from '../../src/modules/essentials/poku.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';

describe('Poku Runner Suite', async () => {
  await it(async () => {
    const code = await poku(
      ['./test/__fixtures__/e2e/success', 'test/__fixtures__/e2e/fail'],
      {
        noExit: true,
        quiet: true,
      }
    );

    assert.deepStrictEqual(code, 1, 'Testing all paths as a string array');
  });

  await it(async () => {
    const code = await poku('./test/__fixtures__/e2e/fail', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 1, 'Testing a fail path as string');
  });

  await it(async () => {
    const code = await poku('./test/__fixtures__/e2e/success', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0, 'Testing a success path as string');
  });

  await it(async () => {
    const code = await poku(['./test/__fixtures__/e2e/success'], {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0);
  });

  await it(async () => {
    const code = await poku(
      ['./test/__fixtures__/e2e/success', 'test/__fixtures__/e2e/fail'],
      {
        noExit: true,
        filter: /success/,
        quiet: true,
      }
    );

    assert.deepStrictEqual(code, 0, 'Filter paths that contains "success"');
  });

  await it(async () => {
    const code = await poku(
      ['./test/__fixtures__/e2e/success', 'test/__fixtures__/e2e/fail'],
      {
        noExit: true,
        filter: /fail/,
        quiet: true,
      }
    );

    assert.deepStrictEqual(code, 1, 'Filter paths that contains "fail"');
  });

  await it(async () => {
    const code = await poku(['test/__fixtures__/e2e/fail'], {
      noExit: true,
      filter: /success/,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0, 'No files (success filter)');
  });

  await it(async () => {
    const code = await poku(
      ['./test/__fixtures__/e2e/success', 'test/__fixtures__/e2e/fail'],
      {
        noExit: true,
        filter: /\.(m)?(j|t)?s$/,
        quiet: true,
      }
    );

    assert.deepStrictEqual(code, 1, 'Filter by extension');
  });
});
