import { execSync } from 'node:child_process';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { Write } from '../../../src/services/write.js';
import { format } from '../../../src/services/format.js';
import { docker } from '../../../src/modules/helpers/container.js';
import { waitForPort } from '../../../src/modules/helpers/wait-for.js';
import { legacyFetch } from '../../helpers/legacy-fetch.test.js';
import { isWindows } from '../../../src/parsers/get-runner.js';

// External error: no matching manifest for windows/amd64
if (isWindows) {
  process.exit(0);
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
    Write.log(format('  ℹ Skipping: Docker not found').success().bold());
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

    await waitForPort(6000, { delay: 100, timeout: 150000 });

    const res = await legacyFetch('localhost', 6000);

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
      cwd: 'fixtures/docker',
    });

    await dockerfile.remove();

    await dockerfile.build();
    await dockerfile.start();

    await dockerfile.stop();
    await dockerfile.remove();
  });
});
