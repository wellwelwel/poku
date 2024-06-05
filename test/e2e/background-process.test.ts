import {
  startService,
  assert,
  test,
  describe,
  startScript,
} from '../../src/index.js';
import { legacyFetch } from '../helpers/legacy-fetch.test.js';
import { ext, isProduction } from '../helpers/capture-cli.test.js';
import { getRuntime } from '../../src/helpers/get-runtime.js';

(async () => {
  const runtime = getRuntime();

  await test(async () => {
    describe('Start Service (Single Port)', { icon: '🔀' });

    const server = await startService(`server-a.${ext}`, {
      startAfter: 'ready',
      cwd:
        ext === 'ts' || isProduction ? 'fixtures/server' : 'ci/fixtures/server',
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

  await test(async () => {
    describe('Start Script (Single Port)', { icon: '🔀' });

    const server = await startScript(`start:${ext}`, {
      startAfter: 'ready',
      cwd:
        ext === 'ts' || isProduction ? 'fixtures/server' : 'ci/fixtures/server',
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

  await test(async () => {
    describe('Start Service (Multiple Ports)', {
      background: false,
      icon: '🔀',
    });

    const server = await startService(`server-a.${ext}`, {
      startAfter: 'ready',
      cwd:
        ext === 'ts' || isProduction ? 'fixtures/server' : 'ci/fixtures/server',
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

  await test(async () => {
    describe('Start Script (Multiple Ports)', {
      background: false,
      icon: '🔀',
    });

    const server = await startScript(`start:${ext}`, {
      startAfter: 'ready',
      cwd:
        ext === 'ts' || isProduction ? 'fixtures/server' : 'ci/fixtures/server',
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

  if (runtime === 'node') {
    await test(async () => {
      describe('Start Service (No Ports)', {
        background: false,
        icon: '🔀',
      });

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

    await test(async () => {
      describe('Start Script (No Ports)', {
        background: false,
        icon: '🔀',
      });

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
  }
})();
