import process from 'node:process';
import {
  startService,
  assert,
  test,
  describe,
  startScript,
} from '../../../src/index.js';
import { legacyFetch } from '../../helpers/legacy-fetch.test.js';

(async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const ext = isProduction ? 'js' : 'ts';

  await test(async () => {
    describe('Start Service', { background: false, icon: '🔀' });

    const server = await startService(`server.${ext}`, {
      startAfter: 'ready',
      cwd: 'test/fixtures/server',
    });

    const res = await legacyFetch('localhost', 5100);

    assert.strictEqual(res?.statusCode, 200, 'Server is on');
    assert.deepStrictEqual(
      JSON.parse(res?.body),
      { name: 'Poku' },
      'Poku is online'
    );

    server.end();
  });

  await test(async () => {
    describe('Start Script', { background: false, icon: '🔀' });

    const server = await startScript(`start:${ext}`, {
      startAfter: 'ready',
      cwd: 'test/fixtures/server',
    });

    const res = await legacyFetch('localhost', 5100);

    assert.strictEqual(res?.statusCode, 200, 'Server is on');
    assert.deepStrictEqual(
      JSON.parse(res?.body),
      { name: 'Poku' },
      'Poku is online'
    );

    server.end();
  });
})();
