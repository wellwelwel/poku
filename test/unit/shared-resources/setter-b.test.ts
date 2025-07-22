import type { SharedResourceType } from './setup.resource.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import {
  dispatchSharedResourceAction,
  getSharedResource,
  sleep,
  test,
} from '../../../src/modules/index.js';

test('should set message in shared resource from file B', async () => {
  await sleep(200);

  assert.doesNotThrow(
    () =>
      dispatchSharedResourceAction('sharedResource', {
        type: 'ADD_MESSAGE',
        payload: 'Message from File B',
      }),
    'Initial message not set correctly'
  );

  const resource =
    await getSharedResource<SharedResourceType>('sharedResource');

  assert.ok(
    resource.messages.includes('Message from File B'),
    'Initial message not set correctly'
  );
});
