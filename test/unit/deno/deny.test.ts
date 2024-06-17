import { test } from '../../../src/modules/test.js';
import { assert } from '../../../src/modules/assert.js';
import { runner } from '../../../src/helpers/runner.js';

test('Deno Permissions (Deny)', () => {
  assert.deepStrictEqual(
    runner('', {
      platform: 'deno',
      deno: {
        allow: [],
        deny: ['read'],
      },
    }),
    ['deno', 'run', '--deny-read'],
    'Custom Permission'
  );

  assert.deepStrictEqual(
    runner('', {
      platform: 'deno',
      deno: {
        allow: [],
        deny: ['read', 'env'],
      },
    }),
    ['deno', 'run', '--deny-read', '--deny-env'],
    'Custom Permissions'
  );

  assert.deepStrictEqual(
    runner('', {
      platform: 'deno',
      deno: {
        allow: [],
        deny: ['read=file.js', 'env'],
      },
    }),
    ['deno', 'run', '--deny-read=file.js', '--deny-env'],
    'Custom Permissions per Files'
  );

  assert.deepStrictEqual(
    runner('', {
      platform: 'deno',
      deno: {
        allow: ['read=file.js', 'net'],
        deny: ['net=server.com', 'env'],
      },
    }),
    [
      'deno',
      'run',
      '--allow-read=file.js',
      '--allow-net',
      '--deny-net=server.com',
      '--deny-env',
    ],
    'Mixed Permissions'
  );
});
