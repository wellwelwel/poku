import type { SharedResourceType } from './setup.resource.js';
import {
  assert,
  getSharedResource,
  sleep,
  subscribeToSharedResource,
  test,
} from '../../../src/modules/index.js';

test('should observe modifications in shared resource', async () => {
  let changes = 0;
  let unsubscribe: () => void;

  const subscription = new Promise<SharedResourceType>((resolve) => {
    unsubscribe = subscribeToSharedResource<SharedResourceType>(
      'sharedResource',
      (updatedResource) => {
        if (++changes >= 3) {
          resolve(updatedResource);
        }
      }
    );
  });

  const timeout = new Promise<SharedResourceType>((_, reject) =>
    setTimeout(() => {
      unsubscribe();
      reject(new Error('Timeout waiting for resource updates'));
    }, 1000)
  );

  const finalResource = await Promise.race([subscription, timeout]);

  assert.ok(
    finalResource.messages.includes('Message from File A'),
    'File A message not found in final resource'
  );
  assert.ok(
    finalResource.messages.includes('Message from File B'),
    'File B message not found in final resource'
  );
});

test('should observe final state after concurrent modifications', async () => {
  let resource: SharedResourceType;

  resource = await getSharedResource<SharedResourceType>('sharedResource');
  assert.ok(resource.messages.length === 0, 'Initial resource should be empty');

  await sleep(300);

  resource = await getSharedResource<SharedResourceType>('sharedResource');

  assert.ok(
    resource.messages.includes('Message from File A'),
    'File A message not found'
  );

  assert.ok(
    resource.messages.includes('Message from File B'),
    'File B message not found'
  );
});
