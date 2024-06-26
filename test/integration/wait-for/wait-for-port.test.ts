import { createServer, type Server } from 'node:http';
import { test } from '../../../src/modules/test.js';
import { it } from '../../../src/modules/it.js';
import { assert } from '../../../src/modules/assert.js';
import { waitForPort } from '../../../src/modules/wait-for.js';
import { kill } from '../../../src/modules/processes.js';

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
    await kill.range(8000, 8003);
  } catch {}

  await Promise.all([
    it(async () => {
      const port = 8000;
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
      const port = 8001;
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
      const port = 8002;

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
      const port = 8003;
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
    await kill.range(8000, 8003);
  } catch {}
});
