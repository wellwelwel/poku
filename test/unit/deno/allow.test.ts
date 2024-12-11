import { test } from '../../../src/modules/helpers/test.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { runner } from '../../../src/parsers/get-runner.js';
import { getRuntime } from '../../../src/parsers/get-runtime.js';
import { skip } from '../../../src/modules/helpers/skip.js';

const runtime = getRuntime();

if (runtime !== 'deno') {
  skip('Skipping for non-Deno platforms');
}

test('Deno Permissions (Allow)', () => {
  assert.deepStrictEqual(
    runner('', {}),
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
      deno: {
        allow: ['read'],
      },
    }),
    ['deno', 'run', '--allow-read'],
    'Custom Permission'
  );

  assert.deepStrictEqual(
    runner('', {
      deno: {
        allow: ['read', 'env'],
      },
    }),
    ['deno', 'run', '--allow-read', '--allow-env'],
    'Custom Permissions'
  );

  assert.deepStrictEqual(
    runner('', {
      deno: {
        allow: ['read=file.js', 'env'],
      },
    }),
    ['deno', 'run', '--allow-read=file.js', '--allow-env'],
    'Custom Permissions per Files'
  );

  assert.deepStrictEqual(
    runner('', {
      deno: {
        allow: [],
      },
    }),
    ['deno', 'run'],
    'No Permissions'
  );
});
