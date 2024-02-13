import { checkNode } from '../helpers/check-node.test.js';

(async () => {
  process.exit(await checkNode(15));
})();
