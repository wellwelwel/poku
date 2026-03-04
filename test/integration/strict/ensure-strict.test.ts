import { GLOBAL } from '../../../src/configs/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { strict } from '../../../src/modules/essentials/strict.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { skip } from '../../../src/modules/helpers/skip.js';

if (GLOBAL.runtime === 'bun')
  skip('Default assert acts as strict method for Bun');

describe('Ensure strict', () => {
  const actual = Object.create(null);
  const expected = { name: 'John' };

  actual.name = 'John';

  assert.deepEqual(actual, expected);
  strict.notDeepEqual(actual, expected);
});
