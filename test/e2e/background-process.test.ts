import { test } from '../../src/modules/test.js';
import { describe } from '../../src/modules/describe.js';
import { it } from '../../src/modules/it.js';
import { assert } from '../../src/modules/assert.js';
import { startScript, startService } from '../../src/modules/create-service.js';
import { legacyFetch } from '../helpers/legacy-fetch.test.js';
import { ext, isProduction } from '../helpers/capture-cli.test.js';
import { getRuntime } from '../../src/helpers/get-runtime.js';

test(async () => {
  const runtime = getRuntime();

  await describe('Start Service (Single Port)', async () => {
    await it(async () => {
      const server = await startService(`server-a.${ext}`, {
        startAfter: 'ready',
        cwd:
          ext === 'ts' || isProduction
            ? 'fixtures/server'
            : 'ci/fixtures/server',
      });

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
        cwd:
          ext === 'ts' || isProduction
            ? 'fixtures/server'
            : 'ci/fixtures/server',
        runner: runtime === 'node' ? 'npm' : runtime,
      });

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
        cwd:
          ext === 'ts' || isProduction
            ? 'fixtures/server'
            : 'ci/fixtures/server',
      });

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
        startAfter: 5000,
        timeout: 6000,
        cwd:
          ext === 'ts' || isProduction
            ? 'fixtures/server'
            : 'ci/fixtures/server',
      });

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
        cwd:
          ext === 'ts' || isProduction
            ? 'fixtures/server'
            : 'ci/fixtures/server',
        runner: runtime === 'node' ? 'npm' : runtime,
      });

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
        startAfter: 5000,
        timeout: 6000,
        cwd:
          ext === 'ts' || isProduction
            ? 'fixtures/server'
            : 'ci/fixtures/server',
        runner: runtime === 'node' ? 'npm' : runtime,
      });

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
          cwd:
            ext === 'ts' || isProduction
              ? 'fixtures/server'
              : 'ci/fixtures/server',
        });

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
          cwd:
            ext === 'ts' || isProduction
              ? 'fixtures/server'
              : 'ci/fixtures/server',
          runner: runtime === 'node' ? 'npm' : runtime,
        });

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
