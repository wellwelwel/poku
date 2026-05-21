const {
  describe,
  it,
  assert,
} = require('../../../../../lib/modules/index.cjs');

describe('Ambiguous package, CJS via .cjs extension', () => {
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
