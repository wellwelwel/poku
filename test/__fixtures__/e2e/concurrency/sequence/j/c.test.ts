import { test } from '../../../../../../src/modules/helpers/test.js';
import { server } from '../server.js';

test(async () => {
  await server();
});
