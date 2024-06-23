import { execSync } from 'node:child_process';
import { describe } from '../../../src/modules/describe.js';
import { it } from '../../../src/modules/it.js';
import { assert } from '../../../src/modules/assert.js';
import { write } from '../../../src/helpers/logs.js';
import { format } from '../../../src/helpers/format.js';
import { docker } from '../../../src/modules/container.js';
import { legacyFetch } from '../../helpers/legacy-fetch.test.js';

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
    write(format('  ℹ Skipping: Docker not found').success().bold());
    return;
  }

  await it('Using custom configs', async () => {
    const dockerfile = docker.dockerfile({
      tagName: 'poku-test-dockerfile',
      containerName: 'poku-test-dockerfile-server',
      ports: ['127.0.0.1:6000:6000'],
      file: 'fixtures/docker/Dockerfile',
      context: 'fixtures/docker',
      environments: ['NODE_ENV=production'],
      envFile: 'fixtures/docker/src/.some.env',
      cache: false,
    });

    await dockerfile.remove();

    await dockerfile.build();
    await dockerfile.start();

    await new Promise((resolve) =>
      setTimeout(async () => {
        const res = await legacyFetch('localhost', 6000);

        await dockerfile.stop();
        await dockerfile.remove();

        assert.strictEqual(res?.statusCode, 200, 'Service is on');
        assert.strictEqual(
          JSON.stringify(res?.body),
          '"Hello, World!\\n"',
          'Service is online'
        );

        resolve(undefined);
      }, 1000)
    );
  });

  await it('Using default configs', async () => {
    const dockerfile = docker.dockerfile({
      tagName: 'poku-test-dockerfile',
      containerName: 'poku-test-dockerfile-server',
      cwd: 'fixtures/docker',
    });

    await dockerfile.remove();

    await dockerfile.build();
    await dockerfile.start();

    await dockerfile.stop();
    await dockerfile.remove();
  });
});
