import { nodeVersion } from '../../src/parsers/get-runtime.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (nodeVersion && nodeVersion < 14) {
  skip();
}

import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { ext, inspectPoku } from '../__utils__/capture-cli.test.js';
import { statSync } from 'node:fs';

describe('Testing afterEach execution after a test failure', async () => {
  await it(async () => {
    const results = await inspectPoku(`after-failure.test.${ext} -d`, {
      cwd: 'test/__fixtures__/e2e/each-api',
    });

    assert.strictEqual(results.exitCode, 1, 'Exit Code needs to be 1');
    assert.throws(() => statSync('test/__fixtures__/.temp/after-failure'));
  });
});
