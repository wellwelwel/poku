import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectCLI, isProduction } from '../helpers/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isProduction) {
  skip();
}

// const offset = 33;

describe('Basic logs with Runner', async () => {
  await it('Basic Logs without using Poku Runner', async () => {
    const results = await inspectCLI(
      'npx tsx ./fixtures/no-runner/basic-logs.test.ts'
    );

    console.log(results.stdout);
    console.log(results.stderr);

    assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  });

  await it('Basic Logs without using Poku Runner + ENV', async () => {
    const results = await inspectCLI(
      'npx tsx ./fixtures/no-runner/basic-logs.test.ts',
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
