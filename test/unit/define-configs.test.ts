import { skip } from '../../src/modules/helpers/skip.js';
import { isProduction } from '../helpers/capture-cli.test.js';

if (isProduction) {
  skip();
}

import { assert } from '../../src/modules/essentials/assert.js';
import { defineConfig } from '../../src/modules/index.js';

assert.deepStrictEqual(
  defineConfig({ debug: true }),
  { debug: true },
  'Reflect configs'
);
