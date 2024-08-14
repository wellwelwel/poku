import { test } from '../../src/modules/helpers/test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import {
  startScript,
  startService,
} from '../../src/modules/helpers/create-service.js';
import { legacyFetch } from '../__utils__/legacy-fetch.test.js';
import { ext } from '../__utils__/capture-cli.test.js';
import { getRuntime } from '../../src/parsers/get-runtime.js';
import { waitForPort } from '../../src/modules/helpers/wait-for.js';
import { skip } from '../../src/modules/index.js';

if (getRuntime() === 'bun') {
  skip('TODO: Check what has changed after Bun v1.1.23');
}

test(async () => {
  const runtime = getRuntime();

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
