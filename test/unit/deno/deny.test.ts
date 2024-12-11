import { test } from '../../../src/modules/helpers/test.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { runner } from '../../../src/parsers/get-runner.js';
import { getRuntime } from '../../../src/parsers/get-runtime.js';
import { skip } from '../../../src/modules/helpers/skip.js';

const runtime = getRuntime();

if (runtime !== 'deno') {
  skip('Skipping for non-Deno platforms');
}

test('Deno Permissions (Deny)', () => {
  assert.deepStrictEqual(
    runner('', {
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
