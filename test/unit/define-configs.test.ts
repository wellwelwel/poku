import { test } from '../../src/modules/helpers/test.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { GLOBAL } from '../../src/configs/poku.js';

if (GLOBAL.runtime === 'deno') skip();

test(async () => {
  const { assert } = await import('../../src/modules/essentials/assert.js');
  const { defineConfig } = await import('../../src/modules/index.js');

  assert.deepStrictEqual(
    defineConfig({ debug: true }),
    { debug: true },
    'Reflect configs'
  );
});
