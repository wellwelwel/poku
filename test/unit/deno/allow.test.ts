import { GLOBAL } from '../../../src/configs/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { skip } from '../../../src/modules/helpers/skip.js';
import { test } from '../../../src/modules/helpers/test.js';
import { runner } from '../../../src/parsers/get-runner.js';

const { runtime } = GLOBAL;

if (runtime !== 'deno') skip('Skipping for non-Deno platforms');

test('Deno Permissions (Allow)', () => {
  GLOBAL.configs = Object.create(null);

  assert.deepStrictEqual(
    runner(''),
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

  GLOBAL.configs = {
    deno: {
      allow: ['read'],
    },
  };

  assert.deepStrictEqual(
    runner(''),
    ['deno', 'run', '--allow-read'],
    'Custom Permission'
  );

  GLOBAL.configs = {
    deno: {
      allow: ['read', 'env'],
    },
  };

  assert.deepStrictEqual(
    runner(''),
    ['deno', 'run', '--allow-read', '--allow-env'],
    'Custom Permissions'
  );

  GLOBAL.configs = {
    deno: {
      allow: ['read=file.js', 'env'],
    },
  };

  assert.deepStrictEqual(
    runner(''),
    ['deno', 'run', '--allow-read=file.js', '--allow-env'],
    'Custom Permissions per Files'
  );

  GLOBAL.configs = {
    deno: {
      allow: [],
    },
  };

  assert.deepStrictEqual(runner(''), ['deno', 'run'], 'No Permissions');
});
