import type { SharedResourceType } from './setup.resource.js';
import nodeAssert from 'node:assert';
import { getSharedResource, test } from '../../../src/modules/index.js';

async function waitUntil(
  cb: () => void,
  timeoutMs = 1000,
  intervalMs = 10
): Promise<void> {
  const start = Date.now();

  return new Promise<void>((resolve, reject) => {
    const check = () => {
      try {
        cb();
        clearInterval(interval);
        resolve();
      } catch {
        if (Date.now() - start > timeoutMs) {
          clearInterval(interval);
          reject(new Error('waitUntil: timeout'));
        }
      }
    };

    const interval = setInterval(check, intervalMs);
    check();
  });
}

test('should observe modifications in shared resource', async () => {
  const res = await getSharedResource<SharedResourceType>('sharedResource');

  nodeAssert.equal(res.messages.length, 0, 'Initial resource should be empty');

  await waitUntil(() => {
    nodeAssert(
      res.messages.includes('Message from File A'),
      'File A message should be present'
    );

    nodeAssert(
      !res.messages.includes('Message from File B'),
      'File B message should not be present'
    );
  });

  await waitUntil(() => {
    nodeAssert(
      res.messages.includes('Message from File A'),
      'File A message should still be present'
    );

    nodeAssert(
      res.messages.includes('Message from File B'),
      'File B message should now be present'
    );
  });
});
