import { GLOBAL } from '../../../src/configs/poku.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { skip } from '../../../src/modules/helpers/skip.js';
import { runtimeVersion } from '../../../src/parsers/runtime-version.js';

if (GLOBAL.runtime !== 'node') skip();
if (runtimeVersion < 16) skip('Strict method is available from Node.js 16');

describe('Ensure strict', async () => {
  const { strict } = await import('../../../src/modules/essentials/strict.js');

  const actual = Object.create(null);
  const expected = { name: 'John' };

  actual.name = 'John';

  assert.deepEqual(actual, expected);
  strict.notDeepEqual(actual, expected);
});
