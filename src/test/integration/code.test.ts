import assert from 'assert';
import { poku } from '../../index.js';

(async () => {
  {
    // Testing all paths as a string array
    const code = await poku(
      ['./src/test/fixtures/success', 'src/test/fixtures/fail'],
      {
        noExit: true,
        quiet: true,
      }
    );

    assert.deepStrictEqual(code, 1);
  }

  // Testing a fail path as string
  {
    const code = await poku('./src/test/fixtures/fail', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 1);
  }

  // Testing a success path as string
  {
    const code = await poku('./src/test/fixtures/success', {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0);
  }

  {
    const code = await poku(['./src/test/fixtures/success'], {
      noExit: true,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0);
  }

  // Only path that contains "success"
  {
    const code = await poku(
      ['./src/test/fixtures/success', 'src/test/fixtures/fail'],
      {
        noExit: true,
        filter: /success/,
        quiet: true,
      }
    );

    assert.deepStrictEqual(code, 0);
  }

  // Only path that contains "fail"
  {
    const code = await poku(
      ['./src/test/fixtures/success', 'src/test/fixtures/fail'],
      {
        noExit: true,
        filter: /fail/,
        quiet: true,
      }
    );

    assert.deepStrictEqual(code, 1);
  }

  // No files
  {
    const code = await poku(['src/test/fixtures/fail'], {
      noExit: true,
      filter: /success/,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0);
  }

  // No files
  {
    const code = await poku(['src/test/fixtures/success'], {
      noExit: true,
      filter: /fail/,
      quiet: true,
    });

    assert.deepStrictEqual(code, 0);
  }

  // Filter by extension
  {
    const code = await poku(
      ['./src/test/fixtures/success', 'src/test/fixtures/fail'],
      {
        noExit: true,
        filter: /\.(m)?(j|t)?s$/,
        quiet: true,
      }
    );

    assert.deepStrictEqual(code, 1);
  }
})();
