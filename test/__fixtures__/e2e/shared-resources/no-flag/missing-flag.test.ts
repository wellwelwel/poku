import { assert } from '../../../../../src/modules/essentials/assert.js';
import { test } from '../../../../../src/modules/helpers/test.js';
import { resource } from '../../../../../src/modules/index.js';
import { SimpleContext } from './resource.js';

test('Should fail without --sharedResources flag', async () => {
  const simple = await resource.use(SimpleContext);
  assert.ok(simple, 'Should not reach here');
});
