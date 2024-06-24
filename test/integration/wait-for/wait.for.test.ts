import process from 'node:process';
import { createServer, Server } from 'node:http';
import { execSync } from 'node:child_process';
import { describe } from '../../../src/modules/describe.js';
import { it } from '../../../src/modules/it.js';
import { assert } from '../../../src/modules/assert.js';
import { waitForPort, sleep } from '../../../src/modules/wait-for.js';
import { kill } from '../../../src/modules/processes.js';
import { write } from '../../../src/helpers/logs.js';
import { format } from '../../../src/helpers/format.js';
import { isWindows } from '../../../src/helpers/runner.js';

const hasLSOF = (() => {
  try {
    if (isWindows) return true;

    execSync('lsof -v', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

const startServer = (port: number): Promise<Server> =>
  new Promise((resolve) => {
    const server = createServer((_, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, world!\n');
    });

    server.listen(port, () => resolve(server));
  });

const stopServer = (server: Server): Promise<void> =>
  new Promise((resolve) => server.close(() => resolve(undefined)));

describe('Wait For Port', async () => {
  if (!hasLSOF) {
    write(format('  ℹ Skipping: lsof not found').success().bold());
    return;
  }

  await kill.range(8000, 8003);

  await Promise.all([
    it(async () => {
      const port = 8000;
      const server = await startServer(port);

      try {
        await waitForPort(port, { timeout: 5000 });
        assert.ok(true, 'Port is active within timeout');
      } catch (error) {
        assert.fail('Port was not active within the timeout period');
      } finally {
        await stopServer(server);
      }
    }),

    it(async () => {
      const port = 8001;
      const server = await startServer(port);

      try {
        await waitForPort(port, { delay: 100 });
        assert.ok(true, 'Port is active within delay');
      } catch (error) {
        assert.fail('Port was not active within the timeout period');
      } finally {
        await stopServer(server);
      }
    }),

    it(async () => {
      const port = 8002;

      try {
        await waitForPort(port, { timeout: 1000 });
        assert.fail('Expected timeout error, but port became active');
      } catch (error) {
        assert.strictEqual(
          (error as Error).message,
          `Timeout waiting for port ${port} to become active`,
          'Expected timeout for missing port'
        );
      }
    }),

    it(async () => {
      const port = 8003;
      const server = await startServer(port);

      try {
        await waitForPort(port, { interval: 1000 });
        assert.ok(true, 'Port is active within delay');
      } catch (error) {
        assert.fail('Port was not active within the timeout period');
      } finally {
        await stopServer(server);
      }
    }),

    it(async () => {
      const startTime = Date.now();
      const delay = 500;
      await sleep(delay);
      const elapsedTime = Date.now() - startTime;
      const margin = 250;

      assert.ok(
        elapsedTime >= delay - margin && elapsedTime <= delay + margin,
        `Expected sleep time to be around ${delay}ms (±${margin}ms), but was ${elapsedTime}ms`
      );
    }),

    it(async () => {
      try {
        await waitForPort(NaN, { timeout: 2000 });
        assert.fail('Expected error for invalid port, but none was thrown');
      } catch (error) {
        assert.strictEqual(
          (error as Error).message,
          'Port must be an integer.',
          'Port must be an integer.'
        );
      }
    }),
  ]);
});

process.on('exit', () => {
  process.on('exit', () => {
    try {
      kill.range(8000, 8003);
    } catch {}
  });
});
