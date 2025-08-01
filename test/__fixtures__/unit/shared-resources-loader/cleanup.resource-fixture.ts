import { createSharedResource } from '../../../../src/modules/helpers/shared-resources.js';

export default createSharedResource(
  'cleanup',
  () => {
    return { value: 42 };
  },
  (_) => {
    // do nothing for cleanup
  }
);
