import { ext } from '../../__utils__/capture-cli.test.js';
import { GLOBAL } from '../../../src/configs/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { poku } from '../../../src/modules/essentials/poku.js';
import { skip } from '../../../src/modules/helpers/skip.js';
import { test } from '../../../src/modules/helpers/test.js';

if (GLOBAL.runtime === 'deno') skip();

test('Before and After Each: updating an external file', async () => {
  const prepareService = true;
  const resetService = true;

  // @ts-expect-error
  const exitCode = await poku(`./test/integration/import.test.${ext}`, {
    noExit: true,
    quiet: true,
    beforeEach: prepareService,
    afterEach: resetService,
  });

  assert.strictEqual(exitCode, 0, 'Should ignore if hooks are invalid');
});
