import { test } from '../../../src/modules/helpers/test.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { runner } from '../../../src/parsers/get-runner.js';

test('Deno Permissions (Allow)', () => {
  assert.deepStrictEqual(
    runner('', {
      platform: 'deno',
    }),
    [
      'deno',
      'run',
      '--allow-read',
      '--allow-env',
      '--allow-run',
      '--allow-net',
      '--allow-hrtime',
    ],
    'Default Permissions'
  );

  assert.deepStrictEqual(
    runner('', {
      platform: 'deno',
      deno: {
        allow: ['read'],
      },
    }),
    ['deno', 'run', '--allow-read'],
    'Custom Permission'
  );

  assert.deepStrictEqual(
    runner('', {
      platform: 'deno',
      deno: {
        allow: ['read', 'env'],
      },
    }),
    ['deno', 'run', '--allow-read', '--allow-env'],
    'Custom Permissions'
  );

  assert.deepStrictEqual(
    runner('', {
      platform: 'deno',
      deno: {
        allow: ['read=file.js', 'env'],
      },
    }),
    ['deno', 'run', '--allow-read=file.js', '--allow-env'],
    'Custom Permissions per Files'
  );

  assert.deepStrictEqual(
    runner('', {
      platform: 'deno',
      deno: {
        allow: [],
      },
    }),
    ['deno', 'run'],
    'No Permissions'
  );
});
