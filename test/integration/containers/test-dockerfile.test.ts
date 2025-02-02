import { execSync } from 'node:child_process';
import { env } from 'node:process';
import { legacyFetch } from '../../__utils__/legacy-fetch.test.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { docker } from '../../../src/modules/helpers/container.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';
import { kill } from '../../../src/modules/helpers/kill.js';
import { skip } from '../../../src/modules/helpers/skip.js';
import { waitForPort } from '../../../src/modules/helpers/wait-for.js';
import { isWindows } from '../../../src/parsers/os.js';

if (isWindows) {
  skip('External error: no matching manifest for windows/amd64');
}

if (env.GITHUB_ACTIONS) {
  skip();
}

const hasDocker = (() => {
  try {
    execSync('docker --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

describe('Docker Service', async () => {
  if (!hasDocker) {
    skip('Docker not found');
  }

  await kill.port(6053);

  await it('Using custom configs', async () => {
    const dockerfile = docker.dockerfile({
      tagName: 'poku-test-dockerfile',
      containerName: 'poku-test-dockerfile-server',
      ports: ['6053:6053'],
      file: 'test/__fixtures__/integration/docker/Dockerfile',
      context: 'test/__fixtures__/integration/docker',
      environments: ['NODE_ENV=build'],
      envFile: 'test/__fixtures__/integration/docker/src/.some.env',
      cache: false,
    });

    await dockerfile.remove();

    await dockerfile.build();
    await dockerfile.start();

    await waitForPort(6053, { delay: 250, timeout: 150000 });

    const res = await legacyFetch('localhost', 6053);

    await dockerfile.stop();
    await dockerfile.remove();

    assert.strictEqual(res?.statusCode, 200, 'Service is on');
    assert.strictEqual(
      JSON.stringify(res?.body),
      '"Hello, World!\\n"',
      'Service is online'
    );
  });

  await it('Using default configs', async () => {
    const dockerfile = docker.dockerfile({
      tagName: 'poku-test-dockerfile',
      containerName: 'poku-test-dockerfile-server',
      cwd: 'test/__fixtures__/integration/docker',
    });

    await dockerfile.remove();

    await dockerfile.build();
    await dockerfile.start();

    await dockerfile.stop();
    await dockerfile.remove();
  });
});
