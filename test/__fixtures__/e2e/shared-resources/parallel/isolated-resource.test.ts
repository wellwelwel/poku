import { assert } from '../../../../../src/modules/essentials/assert.js';
import { test } from '../../../../../src/modules/helpers/test.js';
import {
  resource,
  waitForExpectedResult,
} from '../../../../../src/modules/index.js';
import { FlagContext } from '../counter.js';

test('Test second resource only', async () => {
  const flag = await resource.use(FlagContext);

  await waitForExpectedResult(flag.isActive, true);
  assert.strictEqual(
    await flag.isActive(),
    true,
    'Flag should be active (set by Test A)'
  );
});
