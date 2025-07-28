import { createSharedResource } from '../../../../src/modules/helpers/shared-resources.js';
import { sleep } from '../../../../src/modules/helpers/wait-for.js';

export default createSharedResource('async-factory', async () => {
  await sleep(1000);
  return { value: 42 };
});
