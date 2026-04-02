import { startService } from '../../../../src/modules/helpers/create-service.js';
import { test } from '../../../../src/modules/helpers/test.js';

test(async () => {
  await startService('server-a.ts', {
    startAfter: 'ready',
    cwd: 'test/__fixtures__/e2e/server',
  });

  console.log('service-started');

  await new Promise(() => {});
});
