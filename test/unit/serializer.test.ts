import { assert } from '../../src/modules/essentials/assert.js';
import { test } from '../../src/modules/helpers/test.js';
import { serialize } from '../../src/parsers/output.js';

test('Serializer', () => {
  assert.strictEqual(serialize(undefined), 'undefined', 'undefined');
  assert.strictEqual(serialize(null), 'null', 'null');
  assert.strictEqual(serialize(true), 'true', 'true');
  assert.strictEqual(serialize(false), 'false', 'false');
  assert.strictEqual(serialize(123), '123', 'number');
  assert.strictEqual(serialize(Number.NaN), 'NaN', 'NaN');
  assert.strictEqual(
    serialize(Number.POSITIVE_INFINITY),
    'Infinity',
    'Infinity'
  );
  assert.strictEqual(serialize(123n), '123n', 'bigint');
  assert.strictEqual(serialize('hello'), '"hello"', 'string');
  assert.strictEqual(
    serialize('quotes "inside"'),
    '"quotes \\"inside\\""',
    'string with escapes'
  );
  assert.strictEqual(serialize(Symbol.for('id')), 'Symbol(id)', 'symbol');
  assert.strictEqual(serialize(/foo/gi), '/foo/gi', 'RegExp');
  assert.strictEqual(
    serialize(new Date('2024-01-02T03:04:05.000Z')),
    '2024-01-02T03:04:05.000Z',
    'Date'
  );

  const namedFn = function namedFunction() {};
  assert.strictEqual(
    serialize(namedFn),
    '[Function namedFunction]',
    'named function'
  );

  const anonymousFn = (() => () => {})();
  assert.strictEqual(
    serialize(anonymousFn),
    '[Function]',
    'anonymous function'
  );

  assert.strictEqual(serialize([]), '[]', 'empty array');
  assert.strictEqual(serialize({}), '{}', 'empty object');
  assert.strictEqual(serialize(new Set()), 'Set {}', 'empty Set');
  assert.strictEqual(serialize(new Map()), 'Map {}', 'empty Map');

  assert.strictEqual(serialize([1, 2, 3]), '[\n  1,\n  2,\n  3\n]', 'array');
  assert.strictEqual(
    serialize({ a: 1, b: 2 }),
    '{\n  "a": 1,\n  "b": 2\n}',
    'object'
  );

  assert.strictEqual(
    serialize({ b: 2, a: 1 }),
    serialize({ a: 1, b: 2 }),
    'object keys are sorted (determinism)'
  );

  assert.strictEqual(
    serialize(new Set([1, 2, 3])),
    'Set {\n  1,\n  2,\n  3\n}',
    'Set keeps insertion order (multiline)'
  );

  assert.strictEqual(
    serialize(
      new Map([
        ['a', 1],
        ['b', 2],
      ])
    ),
    'Map {\n  "a" => 1,\n  "b" => 2\n}',
    'Map keeps insertion order (multiline)'
  );

  assert.strictEqual(
    serialize({ outer: { inner: [1, { deep: 'value' }] } }),
    '{\n  "outer": {\n    "inner": [\n      1,\n      {\n        "deep": "value"\n      }\n    ]\n  }\n}',
    'nested structures'
  );

  const circular: Record<string, unknown> = { name: 'root' };
  circular.self = circular;
  assert.strictEqual(
    serialize(circular),
    '{\n  "name": "root",\n  "self": [Circular]\n}',
    'circular reference'
  );

  const circularArray: unknown[] = [1, 2];
  circularArray.push(circularArray);
  assert.strictEqual(
    serialize(circularArray),
    '[\n  1,\n  2,\n  [Circular]\n]',
    'circular array'
  );
});

test('Serializer (Error types)', () => {
  assert.strictEqual(
    serialize(new Error('boom')),
    '[Error: boom]',
    'Error basic'
  );
  assert.strictEqual(
    serialize(new TypeError('wrong type')),
    '[TypeError: wrong type]',
    'TypeError'
  );
  assert.strictEqual(
    serialize(new RangeError('out of range')),
    '[RangeError: out of range]',
    'RangeError'
  );

  const withCause = Object.assign(new Error('outer'), {
    cause: new Error('inner'),
  });
  assert.strictEqual(
    serialize(withCause),
    '[Error: outer]',
    'Error with cause (flat, Jest-compatible)'
  );

  const aggregate = new AggregateError(
    [new Error('a'), new Error('b')],
    'multi'
  );
  assert.strictEqual(
    serialize(aggregate),
    '[AggregateError: multi]',
    'AggregateError (flat, Jest-compatible)'
  );
});

test('Serializer (class instances and prototypes)', () => {
  class Foo {
    x = 1;
    y = 'hello';
  }
  assert.strictEqual(
    serialize(new Foo()),
    'Foo {\n  "x": 1,\n  "y": "hello"\n}',
    'class instance with props'
  );

  class Empty {}
  assert.strictEqual(
    serialize(new Empty()),
    'Empty {}',
    'class instance without props'
  );

  const protoLess = Object.create(null);
  protoLess.x = 1;
  assert.strictEqual(
    serialize(protoLess),
    '{\n  "x": 1\n}',
    'Object.create(null) renders as plain object'
  );
});

test('Serializer (typed arrays and binary)', () => {
  assert.strictEqual(
    serialize(new Uint8Array([1, 2, 3])),
    'Uint8Array [\n  1,\n  2,\n  3\n]',
    'Uint8Array'
  );
  assert.strictEqual(
    serialize(new Uint8Array()),
    'Uint8Array []',
    'Uint8Array empty'
  );
  assert.strictEqual(
    serialize(new Float32Array([1.5, 2.5])),
    'Float32Array [\n  1.5,\n  2.5\n]',
    'Float32Array'
  );
  assert.strictEqual(
    serialize(new BigInt64Array([1n, 2n])),
    'BigInt64Array [\n  1n,\n  2n\n]',
    'BigInt64Array'
  );
  assert.strictEqual(
    serialize(new ArrayBuffer(4)),
    'ArrayBuffer { "byteLength": 4 }',
    'ArrayBuffer'
  );
  assert.strictEqual(
    serialize(new DataView(new ArrayBuffer(8), 2)),
    'DataView { "byteLength": 6, "byteOffset": 2 }',
    'DataView'
  );

  if (typeof Buffer !== 'undefined') {
    assert.strictEqual(
      serialize(Buffer.from('Hi')),
      'Buffer [\n  0x48,\n  0x69\n]',
      'Buffer'
    );
    assert.strictEqual(serialize(Buffer.alloc(0)), 'Buffer []', 'Buffer empty');
  }
});

test('Serializer (opaque and URL types)', () => {
  assert.strictEqual(serialize(Promise.resolve(1)), 'Promise {}', 'Promise');
  assert.strictEqual(serialize(new WeakMap()), 'WeakMap {}', 'WeakMap');
  assert.strictEqual(serialize(new WeakSet()), 'WeakSet {}', 'WeakSet');
  assert.strictEqual(
    serialize(new URL('https://example.com/path?x=1')),
    'URL "https://example.com/path?x=1"',
    'URL'
  );
  assert.strictEqual(
    serialize(new URLSearchParams('a=1&b=2')),
    'URLSearchParams { "a" => "1", "b" => "2" }',
    'URLSearchParams'
  );
  assert.strictEqual(
    serialize(new URLSearchParams()),
    'URLSearchParams {}',
    'URLSearchParams empty'
  );

  const generator = (function* gen() {
    yield 1;
  })();
  assert.strictEqual(serialize(generator), 'Generator {}', 'Generator');
});

test('Serializer (toJSON support)', () => {
  class Money {
    constructor(
      private amount: number,
      private currency: string
    ) {}
    toJSON() {
      return `${this.amount} ${this.currency}`;
    }
  }

  assert.strictEqual(
    serialize(new Money(10, 'USD')),
    '"10 USD"',
    'toJSON returning a primitive'
  );

  class UserModel {
    id = 1;
    name = 'Alice';
    password = 'secret';
    toJSON() {
      return { id: this.id, name: this.name };
    }
  }

  assert.strictEqual(
    serialize(new UserModel()),
    '{\n  "id": 1,\n  "name": "Alice"\n}',
    'toJSON returning a sanitized object'
  );

  class Throws {
    value = 1;
    toJSON() {
      throw new Error('broken');
    }
  }

  assert.strictEqual(
    serialize(new Throws()),
    'Throws {\n  "value": 1\n}',
    'falls back to the original object when toJSON throws'
  );
});

test('Serializer (sparse arrays and symbol keys)', () => {
  const sparse: unknown[] = [1];
  sparse[2] = 3;
  assert.strictEqual(
    serialize(sparse),
    '[\n  1,\n  <empty>,\n  3\n]',
    'sparse array uses <empty>'
  );
  assert.strictEqual(
    serialize([1, undefined, 3]),
    '[\n  1,\n  undefined,\n  3\n]',
    'explicit undefined is preserved'
  );

  const symbolOnly = { [Symbol.for('s')]: 1 };
  assert.strictEqual(
    serialize(symbolOnly),
    '{\n  Symbol(s): 1\n}',
    'object with symbol key only'
  );

  const mixed = { a: 1, [Symbol.for('s')]: 2 };
  assert.strictEqual(
    serialize(mixed),
    '{\n  "a": 1,\n  Symbol(s): 2\n}',
    'object with string and symbol keys (string-first ordering)'
  );
});
