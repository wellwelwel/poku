import { assert, describe, it } from '../../../../../lib/modules/index.js';

describe('Ambiguous package, ESM via .mjs extension', () => {
  it('strictEqual on primitives', () => {
    assert.strictEqual(2 + 2, 4);
  });

  it('match against a regex', () => {
    assert.match('poku rocks', /rocks$/);
  });

  it('throws when the callback throws', () => {
    assert.throws(() => {
      throw new Error('boom');
    }, /boom/);
  });
});
