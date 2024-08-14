import { nodeVersion } from '../../src/parsers/get-runtime.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (nodeVersion && nodeVersion < 16) {
  skip();
}

import { assert } from '../../src/modules/essentials/assert.js';
import { defineConfig } from '../../src/modules/index.js';

assert.deepStrictEqual(
  defineConfig({ debug: true }),
  { debug: true },
  'Reflect configs'
);
