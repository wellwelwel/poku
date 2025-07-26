import type { SharedResourceType } from './setup.resource.js';
import {
  assert,
  getSharedResource,
  sleep,
  test,
} from '../../../src/modules/index.js';

test('should observe modifications in shared resource', async () => {
  const res = await getSharedResource<SharedResourceType>('sharedResource');

  assert.equal(res.messages.length, 0, 'Initial resource should be empty');

  await sleep(250);

  assert(
    res.messages.includes('Message from File A'),
    'File A message should be present'
  );

  assert(
    !res.messages.includes('Message from File B'),
    'File B message should not be present'
  );

  await sleep(500);

  assert(
    res.messages.includes('Message from File A'),
    'File A message should still be present'
  );

  assert(
    res.messages.includes('Message from File B'),
    'File B message should now be present'
  );
});
