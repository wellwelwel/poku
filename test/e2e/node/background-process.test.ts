import process from 'node:process';
import {
  startService,
  assert,
  test,
  describe,
  startScript,
} from '../../../src/index.js';
import { legacyFetch } from '../../helpers/legacy-fetch.test.js';

const isProduction = process.env.NODE_ENV === 'production';
const ext = isProduction ? 'js' : 'ts';

test(async () => {
  describe('Start Service', { background: false, icon: '🔀' });

  const server = await startService(`server-a.${ext}`, {
    startAfter: 'ready',
    cwd: 'test/fixtures/server',
  });

  const res = await legacyFetch('localhost', 4000);

  assert.strictEqual(res?.statusCode, 200, 'Service is on');
  assert.deepStrictEqual(
    JSON.parse(res?.body),
    { name: 'Poku' },
    'Poku service is online'
  );

  server.end();
});

test(async () => {
  describe('Start Script', { background: false, icon: '🔀' });

  const server = await startScript(`start:b:${ext}`, {
    startAfter: 'ready',
    cwd: 'test/fixtures/server',
  });

  const res = await legacyFetch('localhost', 4001);

  assert.strictEqual(res?.statusCode, 200, 'Script is on');
  assert.deepStrictEqual(
    JSON.parse(res?.body),
    { name: 'Poku' },
    'Poku script is online'
  );

  server.end();
});
