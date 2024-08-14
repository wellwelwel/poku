import process from 'node:process';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { ext, inspectCLI } from '../__utils__/capture-cli.test.js';
import { runner } from '../../src/parsers/get-runner.js';

describe('Basic logs with Runner', async () => {
  const cmd = runner(`_.${ext}`).join(' ');

  await it('Basic Logs without using Poku Runner', async () => {
    const results = await inspectCLI(
      `${cmd} ./test/__fixtures__/e2e/no-runner/basic-logs.test.${ext}`
    );

    console.log(results.stdout);
    console.log(results.stderr);

    assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  });

  await it('Basic Logs without using Poku Runner + ENV', async () => {
    const results = await inspectCLI(
      `${cmd} ./test/__fixtures__/e2e/no-runner/basic-logs.test.${ext}`,
      {
        env: {
          ...process.env,
          FILE: 'path-file',
        },
      }
    );

    console.log(results.stdout);
    console.log(results.stderr);

    assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  });
});
