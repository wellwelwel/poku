import process from 'node:process';
import { executeDockerCompose } from '../helpers/check-node.test.js';

(async () => {
  process.exit(await executeDockerCompose('bun-0-5-3'));
})();
