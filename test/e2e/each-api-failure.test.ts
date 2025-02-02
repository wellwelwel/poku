import { statSync } from 'node:fs';
import { ext, inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';

describe('Testing afterEach execution after a test failure', async () => {
  await it(async () => {
    const results = await inspectPoku(`after-failure.test.${ext} -d`, {
      cwd: 'test/__fixtures__/e2e/each-api',
    });

    assert.strictEqual(results.exitCode, 1, 'Exit Code needs to be 1');
    assert.throws(() => statSync('test/__fixtures__/.temp/after-failure'));
  });
});
