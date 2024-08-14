import { test } from '../../../src/modules/helpers/test.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { docker } from '../../../src/modules/helpers/container.js';

const projectName = 'poku';
const serviceName = 'node-22';

test(`Compatibility Tests: ${serviceName}`, async () => {
  const dockerfile = docker.dockerfile({
    containerName: serviceName,
    tagName: `${projectName}-${serviceName}`,
  });

  await dockerfile.remove();

  const compose = docker.compose({
    build: true,
    cwd: './test/__docker__',
    detach: false,
    serviceName,
    projectName,
    // verbose: true,
  });

  const result = await compose.up();

  if (!result) {
    assert.fail(`See the logs by running \`docker logs ${serviceName}\``);
  }

  await dockerfile.remove();
});
