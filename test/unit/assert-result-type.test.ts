import { assert } from '../../src/modules/essentials/assert.js';
import { test } from '../../src/modules/helpers/test.js';
import { serialize } from '../../src/parsers/output.js';

test('Output: serialize (UX contract for assert mismatch)', async () => {
  assert.strictEqual(serialize(undefined), 'undefined', 'Undefined');
  assert.strictEqual(serialize(null), 'null', 'Null');
  assert.strictEqual(serialize(true), 'true', 'True');
  assert.strictEqual(serialize(false), 'false', 'False');
  assert.strictEqual(serialize('string'), '"string"', 'String');
  assert.strictEqual(
    serialize(`
      Multi

      Line
    `),
    JSON.stringify(`
      Multi

      Line
    `),
    'String (Multi Line)'
  );
  assert.strictEqual(serialize(123), '123', 'Number');

  const module = await import('../__fixtures__/unit/sintax/big-int.js');
  assert.strictEqual(
    serialize(module.bigIntValue),
    '987456321456987456321n',
    'BigInt'
  );

  assert.strictEqual(serialize(/123/), '/123/', 'RegExp');

  assert.strictEqual(
    serialize(() => {}),
    '[Function]',
    'Anonymous Function'
  );
  assert.strictEqual(
    serialize((a: number) => a),
    '[Function]',
    'Anonymous Function (Param)'
  );
  assert.strictEqual(
    serialize(function namedFn() {}),
    '[Function namedFn]',
    'Named Function'
  );

  assert.strictEqual(serialize({ a: true }), `{\n  "a": true\n}`, 'Object');
  assert.strictEqual(serialize({}), '{}', 'Object (Empty)');
  assert.strictEqual(
    serialize({ a: { b: 123 }, c: [/123/gi] }),
    `{\n  "a": {\n    "b": 123\n  },\n  "c": [\n    /123/gi\n  ]\n}`,
    'Object (Complex)'
  );

  assert.strictEqual(serialize([1]), `[\n  1\n]`, 'Array');
  assert.strictEqual(serialize([]), '[]', 'Array (Empty)');

  assert.strictEqual(
    serialize(new Map([['key', 'value']])),
    `Map {\n  "key" => "value"\n}`,
    'Map'
  );
  assert.strictEqual(
    serialize(new Set([1, 2, 3, 3])),
    `Set {\n  1,\n  2,\n  3\n}`,
    'Set (deduplicates by Set semantics, preserves insertion order)'
  );

  assert.strictEqual(serialize(Symbol()), 'Symbol()', 'Symbol (no key)');
  assert.strictEqual(serialize(Symbol.for('key')), 'Symbol(key)', 'Symbol.for');
});
