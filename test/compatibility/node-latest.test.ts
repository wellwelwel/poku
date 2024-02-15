import process from 'node:process';
import { executeDockerCompose } from '../helpers/check-node.test.js';

(async () => {
  process.exit(await executeDockerCompose('node-latest'));
})();
