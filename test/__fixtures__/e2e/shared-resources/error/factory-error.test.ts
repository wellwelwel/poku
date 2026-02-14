import { assert } from '../../../../../src/modules/essentials/assert.js';
import { test } from '../../../../../src/modules/helpers/test.js';
import { resource } from '../../../../../src/modules/index.js';
import { BrokenContext } from './broken-resource.js';

test('Should fail when resource factory throws', async () => {
  const broken = await resource.use(BrokenContext);
  assert.ok(broken, 'Should not reach here');
});
