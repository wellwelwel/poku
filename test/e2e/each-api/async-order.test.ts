import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { inspectCLI, isProduction } from '../../helpers/capture-cli.test.js';
import { skip } from '../../../src/modules/helpers/skip.js';

if (isProduction) {
  skip();
}

describe('', async () => {
  await it(async () => {
    const output = await inspectCLI(
      'npx tsx ../../src/bin/index.ts async.test.ts -d',
      {
        cwd: 'fixtures/each-api',
      }
    );

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
  });
});
