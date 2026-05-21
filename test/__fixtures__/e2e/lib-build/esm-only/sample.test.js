import { assert, describe, it } from '../../../../../lib/modules/index.js';

describe('ESM-only against the built ESM bundle', () => {
  it('strictEqual on primitives', () => {
    assert.strictEqual(2 + 2, 4);
  });

  it('match against a regex', () => {
    assert.match('poku rocks', /rocks$/);
  });

  it('deepStrictEqual on objects', () => {
    assert.deepStrictEqual({ a: 1, b: [2, 3] }, { a: 1, b: [2, 3] });
  });

  it('ok on truthy values', () => {
    assert.ok(['poku'].length);
  });

  it('throws when the callback throws', () => {
    assert.throws(() => {
      throw new Error('boom');
    }, /boom/);
  });
});
