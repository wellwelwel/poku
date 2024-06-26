import { test } from '../../src/modules/test.js';
import { assert } from '../../src/modules/assert.js';
import { docker } from '../../src/modules/container.js';

const projectName = 'poku';
const serviceName = 'node-21';

test(`Compatibility Tests: ${serviceName}`, async () => {
  const dockerfile = docker.dockerfile({
    containerName: serviceName,
    tagName: `${projectName}-${serviceName}`,
  });

  await dockerfile.remove();

  const compose = docker.compose({
    build: true,
    cwd: './test/docker',
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
