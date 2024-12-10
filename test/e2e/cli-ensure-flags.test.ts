import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { getRuntime } from '../../src/parsers/get-runtime.js';
import { skip } from '../../src/modules/helpers/skip.js';

const runtime = getRuntime();

if (isBuild || runtime === 'deno') {
  skip();
}

describe('Enforce Option', async () => {
  await it('--enforce', async () => {
    const output = await inspectPoku('--enforce -D --paralell', {
      cwd: 'test/__fixtures__/e2e/no-tests',
    });

    assert.strictEqual(output.exitCode, 1, 'Exit Code needs to be 1');
    assert(/Unrecognized flags/.test(output.stdout), 'Has unrecognized flags');
    assert(/-D/.test(output.stdout), 'Short flag: wrong case for valid option');
    assert(/--paralell/.test(output.stdout), 'Invalid option');
  });

  await it('-x', async () => {
    const output = await inspectPoku('-x -D --paralell', {
      cwd: 'test/__fixtures__/e2e/no-tests',
    });

    assert.strictEqual(output.exitCode, 1, 'Exit Code needs to be 1');
    assert(/Unrecognized flags/.test(output.stdout), 'Has unrecognized flags');
    assert(/-D/.test(output.stdout), 'Short flag: wrong case for valid option');
    assert(/--paralell/.test(output.stdout), 'Invalid option');
  });

  await it('No ensure', async () => {
    const output = await inspectPoku('-D --paralell', {
      cwd: 'test/__fixtures__/e2e/no-tests',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(
      !/Unrecognized flags/.test(output.stdout),
      "Doesn't recognized wrong flags"
    );
  });
});
