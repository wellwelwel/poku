import { GLOBAL } from '../../../src/configs/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { skip } from '../../../src/modules/helpers/skip.js';
import { test } from '../../../src/modules/helpers/test.js';

if (GLOBAL.runtime !== 'deno') skip('Skipping for non-Deno platforms');

test('Deno.version.deno is available', () => {
  assert.strictEqual(typeof Deno.version.deno, 'string');
});
