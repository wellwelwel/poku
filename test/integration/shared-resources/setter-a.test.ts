import type { SharedResourceType } from './setup.resource.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { getSharedResource, test } from '../../../src/modules/index.js';

test('should set message in shared resource from file A', async () => {
  const res = await getSharedResource<SharedResourceType>('sharedResource');

  await assert.doesNotReject(() => res.addMessage('Message from File A'));

  assert(
    res.messages.includes('Message from File A'),
    'Initial message set correctly'
  );
});
