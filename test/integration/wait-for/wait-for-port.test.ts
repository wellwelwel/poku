import type { Server } from 'node:http';
import { createServer } from 'node:http';
import { assert } from '../../../src/modules/essentials/assert.js';
import { it } from '../../../src/modules/helpers/it/core.js';
import { kill } from '../../../src/modules/helpers/kill.js';
import { test } from '../../../src/modules/helpers/test.js';
import { waitForPort } from '../../../src/modules/helpers/wait-for.js';

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

test('Wait For Port', async () => {
  try {
    await kill.range(8001, 8004);
  } catch {}

  await Promise.all([
    it(async () => {
      const port = 8001;
      const server = await startServer(port);

      try {
        await waitForPort(port, { timeout: 5000 });
        assert.ok(true, 'Port is active within timeout');
      } catch {
        assert.fail('Port was not active within the timeout period');
      } finally {
        await stopServer(server);
      }
    }),

    it(async () => {
      const port = 8002;
      const server = await startServer(port);

      try {
        await waitForPort(port, { delay: 100 });
        assert.ok(true, 'Port is active within delay');
      } catch {
        assert.fail('Port was not active within the timeout period');
      } finally {
        await stopServer(server);
      }
    }),

    it(async () => {
      const port = 8003;

      try {
        await waitForPort(port, { timeout: 1000 });
        assert.fail('Expected timeout error, but port became active');
      } catch (error) {
        assert.strictEqual(
          (error as Error).message,
          'Timeout',
          'Expected timeout for missing port'
        );
      }
    }),

    it(async () => {
      const port = 8004;
      const server = await startServer(port);

      try {
        await waitForPort(port, { interval: 1000 });
        assert.ok(true, 'Port is active within delay');
      } catch {
        assert.fail('Port was not active within the timeout period');
      } finally {
        await stopServer(server);
      }
    }),

    it(async () => {
      try {
        await waitForPort(Number.NaN, { timeout: 2000 });
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

  try {
    await kill.range(8001, 8004);
  } catch {}
});
