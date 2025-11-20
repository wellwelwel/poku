import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { isWindows } from '../../src/parsers/os.js';

describe('Ensure sequential runs', async () => {
  const results = await inspectPoku(
    `--debug --sequential --denoAllow=${isWindows ? '"all"' : 'all'}`,
    {
      cwd: 'test/__fixtures__/e2e/sequential',
    }
  );

  if (results.exitCode !== 0) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
});
