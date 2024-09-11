import { skip } from '../../../src/modules/helpers/skip.js';
import { getRuntime, nodeVersion } from '../../../src/parsers/get-runtime.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { assert } from '../../../src/modules/essentials/assert.js';

if ((nodeVersion && nodeVersion < 16) || getRuntime() !== 'node') {
  skip('Strict method is available from Node.js 16');
}

describe('Ensure strict', async () => {
  const { strict } = await import('../../../src/modules/essentials/strict.js');

  const actual = Object.create(null);
  const expected = { name: 'John' };

  actual.name = 'John';

  assert.deepEqual(actual, expected);
  strict.notDeepEqual(actual, expected);
});
