import { assert } from '../../../../src/modules/essentials/assert.js';
import { describe } from '../../../../src/modules/helpers/describe.js';
import { it } from '../../../../src/modules/helpers/it/core.js';

describe('Suite', () => {
  it('Node: should pass', () => {
    assert(true);
  });

  it('Bun: should pass', () => {
    assert(true);
  });

  it('Deno: should pass', () => {
    assert(true);
  });
});
