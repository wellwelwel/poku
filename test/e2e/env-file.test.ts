import process from 'node:process';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { isWindows } from '../../src/parsers/os.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) {
  skip();
}

describe('.env File', async () => {
  await it('CLI Env Variables Propagation (default)', async () => {
    const results = await inspectPoku('--envFile', {
      env: {
        ...process.env,
        MY_VAR: 'Poku',
      },
      cwd: 'test/__fixtures__/e2e/env',
    });

    if (results.exitCode) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
  });

  await it('CLI Env Variables Propagation (custom)', async () => {
    const results = await inspectPoku(
      isWindows ? '--envFile=".env.test"' : '--envFile=.env.test',
      {
        env: {
          ...process.env,
          MY_VAR: 'Poku',
        },
        cwd: 'test/__fixtures__/e2e/env',
      }
    );

    if (results.exitCode) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');
  });
});
