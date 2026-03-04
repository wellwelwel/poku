import { GLOBAL } from '../../../src/configs/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { skip } from '../../../src/modules/helpers/skip.js';
import { test } from '../../../src/modules/helpers/test.js';

if (GLOBAL.runtime !== 'bun') skip('Skipping for non-Bun platforms');

test('Bun.version is available', () => {
  assert.strictEqual(typeof Bun.version, 'string');
});
