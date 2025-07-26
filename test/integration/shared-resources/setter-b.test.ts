import type { SharedResourceType } from './setup.resource.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { getSharedResource, sleep, test } from '../../../src/modules/index.js';

test('should set message in shared resource from file B', async () => {
  await sleep(500);

  const res = await getSharedResource<SharedResourceType>('sharedResource');

  await assert.doesNotReject(() => res.addMessage('Message from File B'));

  assert(
    res.messages.includes('Message from File B'),
    'Initial message set correctly'
  );
});
