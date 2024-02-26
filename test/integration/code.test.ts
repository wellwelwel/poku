import { poku, assert } from '../../src/index.js';

(async () => {
  {
    const code = await poku(['./test/fixtures/success', 'test/fixtures/fail'], {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 1, 'Testing all paths as a string array');
  }

  {
    const code = await poku('./test/fixtures/fail', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 1, 'Testing a fail path as string');
  }

  {
    const code = await poku('./test/fixtures/success', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0, 'Testing a success path as string');
  }

  {
    const code = await poku(['./test/fixtures/success'], {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0);
  }

  {
    const code = await poku(['./test/fixtures/success', 'test/fixtures/fail'], {
      noExit: true,
      filter: /success/,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0, 'Filter paths that contains "success"');
  }

  {
    const code = await poku(['./test/fixtures/success', 'test/fixtures/fail'], {
      noExit: true,
      filter: /fail/,
      quiet: true,
    });

    assert.deepStrictEqual(code, 1, 'Filter paths that contains "fail"');
  }

  {
    const code = await poku(['test/fixtures/fail'], {
      noExit: true,
      filter: /success/,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0, 'No files (success filter)');
  }

  {
    const code = await poku(['./test/fixtures/success', 'test/fixtures/fail'], {
      noExit: true,
      filter: /\.(m)?(j|t)?s$/,
      quiet: true,
    });

    assert.deepStrictEqual(code, 1, 'Filter by extension');
  }
})();
