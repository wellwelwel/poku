import { ext } from '../__utils__/capture-cli.test.js';
import { legacyFetch } from '../__utils__/legacy-fetch.test.js';
import { GLOBAL } from '../../src/configs/poku.js';
import { assert } from '../../src/modules/essentials/assert.js';
import {
  startScript,
  startService,
} from '../../src/modules/helpers/create-service.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { getPIDs } from '../../src/modules/helpers/get-pids.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { kill } from '../../src/modules/helpers/kill.js';
import { test } from '../../src/modules/helpers/test.js';
import { sleep, waitForPort } from '../../src/modules/helpers/wait-for.js';

test(async () => {
  const { runtime } = GLOBAL;

  await describe('Start Service (Single Port)', async () => {
    await it(async () => {
      const server = await startService(`server-a.${ext}`, {
        startAfter: 'ready',
        cwd: 'test/__fixtures__/e2e/server',
      });

      await waitForPort(4000, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4000);

      assert.strictEqual(res?.statusCode, 200, 'Service is on');
      assert.deepStrictEqual(
        JSON.parse(res?.body),
        { name: 'Poku' },
        'Poku service is online'
      );

      await server.end(4000);
    });
  });

  await describe('Start Script (Single Port)', async () => {
    await it(async () => {
      const server = await startScript(`start:${ext}`, {
        startAfter: 'ready',
        cwd: 'test/__fixtures__/e2e/server',
        runner: runtime === 'node' ? 'npm' : runtime,
      });

      await waitForPort(4001, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4001);

      assert.strictEqual(res?.statusCode, 200, 'Script is on');
      assert.deepStrictEqual(
        JSON.parse(res?.body),
        { name: 'Poku' },
        'Poku script is online'
      );

      await server.end(4001);
    });
  });

  await describe('Start Service (Multiple Ports)', async () => {
    await it(async () => {
      const server = await startService(`server-a.${ext}`, {
        startAfter: 'ready',
        cwd: 'test/__fixtures__/e2e/server',
      });

      await waitForPort(4000, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4000);

      assert.strictEqual(res?.statusCode, 200, 'Service is on');
      assert.deepStrictEqual(
        JSON.parse(res?.body),
        { name: 'Poku' },
        'Poku service is online'
      );

      await server.end([4000]);
    });
  });

  await describe('Start Service (Timer)', async () => {
    await it(async () => {
      const server = await startService(`server-a.${ext}`, {
        startAfter: 2500,
        timeout: 10000,
        cwd: 'test/__fixtures__/e2e/server',
      });

      await waitForPort(4000, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4000);

      assert.strictEqual(res?.statusCode, 200, 'Service is on');
      assert.deepStrictEqual(
        JSON.parse(res?.body),
        { name: 'Poku' },
        'Poku service is online'
      );

      await server.end([4000]);
    });
  });

  await describe('Start Script (Multiple Ports)', async () => {
    await it(async () => {
      const server = await startScript(`start:${ext}`, {
        startAfter: 'ready',
        cwd: 'test/__fixtures__/e2e/server',
        runner: runtime === 'node' ? 'npm' : runtime,
      });

      await waitForPort(4001, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4001);

      assert.strictEqual(res?.statusCode, 200, 'Script is on');
      assert.deepStrictEqual(
        JSON.parse(res?.body),
        { name: 'Poku' },
        'Poku script is online'
      );

      await server.end([4001]);
    });
  });

  await describe('Start Script (Timer)', async () => {
    await it(async () => {
      const server = await startScript(`start:${ext}`, {
        startAfter: 2500,
        timeout: 10000,
        cwd: 'test/__fixtures__/e2e/server',
        runner: runtime === 'node' ? 'npm' : runtime,
      });

      await waitForPort(4001, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4001);

      assert.strictEqual(res?.statusCode, 200, 'Script is on');
      assert.deepStrictEqual(
        JSON.parse(res?.body),
        { name: 'Poku' },
        'Poku script is online'
      );

      await server.end([4001]);
    });
  });

  await describe('Start Service (No "startAfter")', async () => {
    await it(async () => {
      const server = await startService(`server-a.${ext}`, {
        cwd: 'test/__fixtures__/e2e/server',
      });

      await waitForPort(4000, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4000);

      assert.strictEqual(res?.statusCode, 200, 'Service is on');
      assert.deepStrictEqual(
        JSON.parse(res?.body),
        { name: 'Poku' },
        'Poku service is online'
      );

      await server.end([4000]);
    });
  });

  await describe('Start Script (No "startAfter")', async () => {
    await it(async () => {
      const server = await startScript(`start:${ext}`, {
        cwd: 'test/__fixtures__/e2e/server',
        runner: runtime === 'node' ? 'npm' : runtime,
      });

      await waitForPort(4001, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4001);

      assert.strictEqual(res?.statusCode, 200, 'Script is on');
      assert.deepStrictEqual(
        JSON.parse(res?.body),
        { name: 'Poku' },
        'Poku script is online'
      );

      await server.end([4001]);
    });
  });

  await describe('Start Service (No "cwd")', async () => {
    await it(async () => {
      const server = await startService(
        `test/__fixtures__/e2e/server/server-a.${ext}`,
        {
          startAfter: 'ready',
        }
      );

      await waitForPort(4000, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4000);

      assert.strictEqual(res?.statusCode, 200, 'Service is on');
      assert.deepStrictEqual(
        JSON.parse(res?.body),
        { name: 'Poku' },
        'Poku service is online'
      );

      await server.end(4000);
    });
  });

  await describe('Start Service (Double end)', async () => {
    await it(async () => {
      const server = await startService(`server-a.${ext}`, {
        startAfter: 'ready',
        cwd: 'test/__fixtures__/e2e/server',
      });

      await waitForPort(4000, { timeout: 10000, delay: 100 });

      await server.end(4000);
      await sleep(250);
      await server.end(4000);
    });
  });

  await describe('kill.pid (via getPIDs)', async () => {
    await it(async () => {
      await startService(`server-a.${ext}`, {
        startAfter: 'ready',
        cwd: 'test/__fixtures__/e2e/server',
      });

      await waitForPort(4000, { timeout: 10000, delay: 100 });

      const pids = await getPIDs(4000);

      assert.ok(pids.length > 0, 'Should find at least one PID');
      await kill.pid(pids[0]);
    });
  });

  await describe('kill.port', async () => {
    await it(async () => {
      await startService(`server-a.${ext}`, {
        startAfter: 'ready',
        cwd: 'test/__fixtures__/e2e/server',
      });

      await waitForPort(4000, { timeout: 10000, delay: 100 });
      const res = await legacyFetch('localhost', 4000);

      assert.strictEqual(res?.statusCode, 200, 'Service is on before kill');
      await kill.port(4000);
    });
  });

  if (runtime === 'node') {
    await describe('Start Service (No Ports)', async () => {
      await it(async () => {
        const server = await startService(`server-a.${ext}`, {
          startAfter: 'ready',
          cwd: 'test/__fixtures__/e2e/server',
        });

        await waitForPort(4000, { timeout: 10000, delay: 100 });
        const res = await legacyFetch('localhost', 4000);

        assert.strictEqual(res?.statusCode, 200, 'Service is on');
        assert.deepStrictEqual(
          JSON.parse(res?.body),
          { name: 'Poku' },
          'Poku service is online'
        );

        await server.end();
      });
    });

    await describe('Start Script (No Ports)', async () => {
      await it(async () => {
        const server = await startScript(`start:${ext}`, {
          startAfter: 'ready',
          cwd: 'test/__fixtures__/e2e/server',
          runner: runtime === 'node' ? 'npm' : runtime,
        });

        await waitForPort(4001, { timeout: 10000, delay: 100 });
        const res = await legacyFetch('localhost', 4001);

        assert.strictEqual(res?.statusCode, 200, 'Script is on');
        assert.deepStrictEqual(
          JSON.parse(res?.body),
          { name: 'Poku' },
          'Poku script is online'
        );

        await server.end();
      });
    });
  }
});
