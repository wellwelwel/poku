import type { SharedResourceType } from './setup.resource.js';
import {
  assert,
  getSharedResource,
  sleep,
  test,
} from '../../../src/modules/index.js';

test('should observe modifications in shared resource', async () => {
  const res = await getSharedResource<SharedResourceType>('sharedResource');

  assert.ok(res.messages.length === 0, 'Initial resource should be empty');

  await sleep(150);

  assert(
    res.messages.includes('Message from File A'),
    'File A message should be present'
  );

  assert(
    !res.messages.includes('Message from File B'),
    'File B message should not be present'
  );

  await sleep(100);

  assert(
    res.messages.includes('Message from File A'),
    'File A message should still be present'
  );

  assert(
    res.messages.includes('Message from File B'),
    'File B message should now be present'
  );
});
