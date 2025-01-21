import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { GLOBAL } from '../../src/configs/poku.js';

if (isBuild || GLOBAL.runtime === 'deno') skip();

describe('Enforce Option', async () => {
  await it('--enforce', async () => {
    const output = await inspectPoku(
      '--enforce -D --paralell --concurrency=g --config=test.json --envFile --debug=test --watchInterval',
      {
        cwd: 'test/__fixtures__/e2e/no-tests',
      }
    );

    assert.strictEqual(output.exitCode, 1, 'Exit Code needs to be 1');
    assert(/Ensure Enabled/.test(output.stdout), '"ensure" is enabled');
    assert(
      /-D: unrecognized flag./.test(output.stdout),
      'Has unrecognized short flags'
    );
    assert(
      /--paralell: unrecognized flag./.test(output.stdout),
      'Has unrecognized flags'
    );
    assert(
      /--debug: this flag shouldn't receive a value./.test(output.stdout),
      'Has unrecognized values in non-value flags'
    );
    assert(
      /--config: .\/test.json doesn't exists./.test(output.stdout),
      "Config file doesn't exists"
    );
    assert(
      /--envFile: .\/.env doesn't exists./.test(output.stdout),
      "Default .env file doesn't exists"
    );
    assert(
      /--envFile: .\/.env doesn't exists./.test(output.stdout),
      "Env file doesn't exists"
    );
    assert(
      /--watchInterval: this flag require a value./.test(output.stdout),
      'Missing required value'
    );
    assert(
      /--concurrency: expects for a valid integer./.test(output.stdout),
      'Wrong value'
    );
  });

  await it('-x', async () => {
    const output = await inspectPoku(
      '-x -D --paralell --concurrency=g --config=test.json --envFile --debug=test --watchInterval',
      {
        cwd: 'test/__fixtures__/e2e/no-tests',
      }
    );

    assert.strictEqual(output.exitCode, 1, 'Exit Code needs to be 1');
    assert(/Ensure Enabled/.test(output.stdout), '"ensure" is enabled');
    assert(
      /-D: unrecognized flag./.test(output.stdout),
      'Has unrecognized short flags'
    );
    assert(
      /--paralell: unrecognized flag./.test(output.stdout),
      'Has unrecognized flags'
    );
    assert(
      /--debug: this flag shouldn't receive a value./.test(output.stdout),
      'Has unrecognized values in non-value flags'
    );
    assert(
      /--config: .\/test.json doesn't exists./.test(output.stdout),
      "Config file doesn't exists"
    );
    assert(
      /--envFile: .\/.env doesn't exists./.test(output.stdout),
      "Default .env file doesn't exists"
    );
    assert(
      /--envFile: .\/.env doesn't exists./.test(output.stdout),
      "Env file doesn't exists"
    );
    assert(
      /--watchInterval: this flag require a value./.test(output.stdout),
      'Missing required value'
    );
    assert(
      /--concurrency: expects for a valid integer./.test(output.stdout),
      'Wrong value'
    );
  });

  await it('No ensure', async () => {
    const output = await inspectPoku('-D --paralell', {
      cwd: 'test/__fixtures__/e2e/no-tests',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(
      !/Ensure Enabled/.test(output.stdout),
      "Doesn't recognized wrong flags"
    );
  });
});
