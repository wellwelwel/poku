import { createSharedResource } from '../../../../src/modules/helpers/shared-resources.js';

export default createSharedResource('valid', () => {
  return { value: 42 };
});
