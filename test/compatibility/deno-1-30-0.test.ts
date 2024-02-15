import process from 'node:process';
import { executeDockerCompose } from '../helpers/check-node.test.js';

(async () => {
  process.exit(await executeDockerCompose('deno-1-30-0'));
})();
