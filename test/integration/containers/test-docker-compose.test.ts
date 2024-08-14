import { execSync } from 'node:child_process';
import { env } from 'node:process';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { docker } from '../../../src/modules/helpers/container.js';
import { legacyFetch } from '../../__utils__/legacy-fetch.test.js';
import { isWindows } from '../../../src/parsers/get-runner.js';
import { waitForPort } from '../../../src/modules/helpers/wait-for.js';
import { kill } from '../../../src/modules/helpers/kill.js';
import { skip } from '../../../src/modules/helpers/skip.js';

if (isWindows) {
  skip('External error: no matching manifest for windows/amd64');
}

if (env.GITHUB_ACTIONS) {
  skip();
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

  await kill.port(6054);

  await it('Using all configs', async () => {
    const compose = docker.compose({
      file: 'docker-compose.yml',
      projectName: 'poku-test-docker-compose',
      cwd: 'test/__fixtures__/integration/docker',
      envFile: 'src/.some.env',
      build: true,
      serviceName: 'server',
    });

    await compose.up();
    await waitForPort(6054, { delay: 250, timeout: 150000 });

    const res = await legacyFetch('localhost', 6054);

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
      cwd: 'test/__fixtures__/integration/docker',
    });

    await compose.up();
    await waitForPort(6054, { delay: 250, timeout: 150000 });

    const res = await legacyFetch('localhost', 6054);

    await compose.down();

    assert.strictEqual(res?.statusCode, 200, 'Service is on');
    assert.strictEqual(
      JSON.stringify(res?.body),
      '"Hello, World!\\n"',
      'Service is online'
    );
  });
});
