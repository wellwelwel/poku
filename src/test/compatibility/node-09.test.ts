import { checkNode } from '../helpers/check-node.js';

(async () => {
  process.exit(await checkNode(9));
})();
