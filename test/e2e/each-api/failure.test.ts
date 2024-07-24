import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { inspectCLI, isProduction } from '../../helpers/capture-cli.test.js';
import { skip } from '../../../src/modules/helpers/skip.js';

if (isProduction) {
  skip();
}

describe('Testing afterEach execution after a test failure', async () => {
  await it(async () => {
    const results = await inspectCLI(
      'npx tsx ../../src/bin/index.ts after-failure.test.ts -d',
      {
        cwd: 'fixtures/each-api',
      }
    );

    console.log(results.stdout);
    console.log(results.stderr);

    assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  });
});
