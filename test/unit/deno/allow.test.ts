import { describe } from '../../../src/modules/describe.js';
import { test } from '../../../src/modules/test.js';
import { assert } from '../../../src/modules/assert.js';
import { runner } from '../../../src/helpers/runner.js';

describe('Deno Permissions (Allow)', { icon: '🔬' });

test(() => {
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
