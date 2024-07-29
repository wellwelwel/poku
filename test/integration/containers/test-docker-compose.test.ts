import { execSync } from 'node:child_process';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { docker } from '../../../src/modules/helpers/container.js';
import { legacyFetch } from '../../helpers/legacy-fetch.test.js';
import { isWindows } from '../../../src/parsers/get-runner.js';
import { waitForPort } from '../../../src/modules/helpers/wait-for.js';
import { skip } from '../../../src/modules/helpers/skip.js';

if (isWindows) {
  skip('External error: no matching manifest for windows/amd64');
}

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
    skip('Docker Compose not found');
  }

  await it('Using all configs', async () => {
    const compose = docker.compose({
      file: 'docker-compose.yml',
      projectName: 'poku-test-docker-compose',
      cwd: 'fixtures/docker',
      envFile: 'src/.some.env',
      build: true,
      serviceName: 'server',
    });

    await compose.up();
    await waitForPort(6001, { delay: 100, timeout: 150000 });

    const res = await legacyFetch('localhost', 6001);

    await compose.down();

    assert.strictEqual(res?.statusCode, 200, 'Service is on');
    assert.strictEqual(
      JSON.stringify(res?.body),
      '"Hello, World!\\n"',
      'Service is online'
    );
  });

  await it('Using default configs', async () => {
    const compose = docker.compose({
      projectName: 'poku-test-docker-compose',
      cwd: 'fixtures/docker',
    });

    await compose.up();
    await waitForPort(6001, { delay: 100, timeout: 150000 });

    const res = await legacyFetch('localhost', 6001);

    await compose.down();

    assert.strictEqual(res?.statusCode, 200, 'Service is on');
    assert.strictEqual(
      JSON.stringify(res?.body),
      '"Hello, World!\\n"',
      'Service is online'
    );
  });
});
