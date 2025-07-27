import { GLOBAL } from '../../../src/configs/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { skip } from '../../../src/modules/helpers/skip.js';
import { runtimeVersion } from '../../../src/parsers/runtime-version.js';

if (GLOBAL.runtime !== 'bun')
  skip('Default assert acts as strict method for Bun');

if (GLOBAL.runtime === 'deno' && runtimeVersion >= 1)
  skip('Default assert acts as strict method for Deno v1');

describe('Ensure strict', async () => {
  const { strict } = await import('../../../src/modules/essentials/strict.js');

  const actual = Object.create(null);
  const expected = { name: 'John' };

  actual.name = 'John';

  assert.deepEqual(actual, expected);
  strict.notDeepEqual(actual, expected);
});
