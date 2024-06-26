import { test } from '../../src/modules/test.js';
import { assert } from '../../src/modules/assert.js';
import { docker } from '../../src/modules/container.js';

const serviceName = 'bun-canary';

test(`Compatibility Tests: ${serviceName}`, async () => {
  const dockerfile = docker.dockerfile({
    detach: false,
    containerName: serviceName,
    tagName: serviceName,
    file: 'test/docker/bun/canary.Dockerfile',
    environments: ['NODE_ENV=production'],
  });

  await dockerfile.remove();
  await dockerfile.build();

  const result = await dockerfile.start();

  if (!result) {
    assert.fail(`See the logs by running \`docker logs ${serviceName}\``);
  }

  await dockerfile.remove();
});
