import { retry } from '../../../../src/modules/index.js';

await retry(2, () => {
  throw new Error('callback threw outside an assertion');
});
