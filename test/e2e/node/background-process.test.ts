import {
  startService,
  assert,
  test,
  describe,
  startScript,
} from '../../../src/index.js';
import { legacyFetch } from '../../helpers/legacy-fetch.test.js';
import { ext, isProduction } from '../../helpers/capture-cli.test.js';
import { getRuntime } from '../../../src/helpers/get-runtime.js';

const runtime = getRuntime();

test(async () => {
  describe('Start Service', { background: false, icon: '🔀' });

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

  server.end(4000);
});

test(async () => {
  if (runtime === 'bun') return;

  describe('Start Script', { background: false, icon: '🔀' });

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

  server.end(4001);
});
