import { test } from '../../src/modules/helpers/test.js';
import { getRuntime } from '../../src/parsers/get-runtime.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (getRuntime() === 'deno') skip();

test(async () => {
  const { assert } = await import('../../src/modules/essentials/assert.js');
  const { defineConfig } = await import('../../src/modules/index.js');

  assert.deepStrictEqual(
    defineConfig({ debug: true }),
    { debug: true },
    'Reflect configs'
  );
});
