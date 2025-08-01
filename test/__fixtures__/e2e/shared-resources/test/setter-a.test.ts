import type { SharedResourceType } from './setup.resource.js';
import { assert } from '../../../../../src/modules/essentials/assert.js';
import { getSharedResource } from '../../../../../src/modules/helpers/shared-resources.js';
import { test } from '../../../../../src/modules/helpers/test.js';

test('should set message in shared resource from file A', async () => {
  const [resource, detach] =
    await getSharedResource<SharedResourceType>('sharedResource');

  resource.addMessage('Message from File A');

  await assert.doesNotReject(() => resource.addMessage('Message from File A'));

  assert(
    resource.messages.includes('Message from File A'),
    'Message from File A should be in the shared resource'
  );

  detach();
});
