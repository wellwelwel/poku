import { execSync } from 'node:child_process';
import { describe } from '../../../src/modules/describe.js';
import { it } from '../../../src/modules/it.js';
import { assert } from '../../../src/modules/assert.js';
import { write } from '../../../src/helpers/logs.js';
import { format } from '../../../src/helpers/format.js';
import { docker } from '../../../src/modules/container.js';
import { legacyFetch } from '../../helpers/legacy-fetch.test.js';
import { isWindows } from '../../../src/helpers/runner.js';

// External error: no matching manifest for windows/amd64
if (isWindows) process.exit(0);

const hasDockerCompose = (() => {
  try {
    execSync('docker compose --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

describe('Docker Compose Service', async () => {
  if (!hasDockerCompose) {
    write(format('  ℹ Skipping: Docker Compose not found').success().bold());
    return;
  }

  await it('Using all configs', async () => {
    const compose = docker.compose({
      file: 'docker-compose.yml',
      projectName: 'poku-test-docker-compose',
      cwd: 'fixtures/docker',
      envFile: 'src/.some.env',
      build: true,
      serviceName: 'server',
      verbose: true,
    });

    await compose.up();

    await new Promise((resolve) =>
      setTimeout(async () => {
        const res = await legacyFetch('localhost', 6001);

        await compose.down();

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
    const compose = docker.compose({
      projectName: 'poku-test-docker-compose',
      cwd: 'fixtures/docker',
      verbose: true,
    });

    await compose.up();

    await new Promise((resolve) =>
      setTimeout(async () => {
        const res = await legacyFetch('localhost', 6001);

        await compose.down();

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
});
