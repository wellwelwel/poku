import type { SharedResourceType } from './setup.resource.js';
import { assert } from '../../../../../src/modules/essentials/assert.js';
import { getSharedResource } from '../../../../../src/modules/helpers/shared-resources.js';
import { test } from '../../../../../src/modules/helpers/test.js';
import { waitForExpectedResult } from '../../../../../src/modules/helpers/wait-for.js';

test('should observe modifications in shared resource', async () => {
  const res = await getSharedResource<SharedResourceType>('sharedResource');

  const messagesIncludes = (message: string) => {
    return () => res.messages.includes(message);
  };

  await assert.doesNotReject(() => {
    return Promise.all([
      waitForExpectedResult(messagesIncludes('Message from File A'), true),
      waitForExpectedResult(messagesIncludes('Message from File B'), true),
    ]);
  });
});
