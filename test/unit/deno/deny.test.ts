import { GLOBAL } from '../../../src/configs/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { skip } from '../../../src/modules/helpers/skip.js';
import { test } from '../../../src/modules/helpers/test.js';
import { runner } from '../../../src/parsers/get-runner.js';

const { runtime } = GLOBAL;

if (runtime !== 'deno') skip('Skipping for non-Deno platforms');

test('Deno Permissions (Deny)', () => {
  GLOBAL.configs = {
    deno: {
      allow: [],
      deny: ['read'],
    },
  };

  assert.deepStrictEqual(
    runner(''),
    ['deno', 'run', '--deny-read'],
    'Custom Permission'
  );

  GLOBAL.configs = {
    deno: {
      allow: [],
      deny: ['read', 'env'],
    },
  };

  assert.deepStrictEqual(
    runner(''),
    ['deno', 'run', '--deny-read', '--deny-env'],
    'Custom Permissions'
  );

  GLOBAL.configs = {
    deno: {
      allow: [],
      deny: ['read=file.js', 'env'],
    },
  };

  assert.deepStrictEqual(
    runner(''),
    ['deno', 'run', '--deny-read=file.js', '--deny-env'],
    'Custom Permissions per Files'
  );

  GLOBAL.configs = {
    deno: {
      allow: ['read=file.js', 'net'],
      deny: ['net=server.com', 'env'],
    },
  };

  assert.deepStrictEqual(
    runner(''),
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
