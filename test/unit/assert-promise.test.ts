import { assertPromise as assert } from '../../src/index.js';

assert.ok(true, 'ok with true');
assert.ok(1, 'ok with 1');

assert.equal(1, 1, 'equal with same numbers');
assert.equal('text', 'text', 'equal with same strings');

assert.deepEqual({ a: 1 }, { a: 1 }, 'deepEqual with same objects');
assert.deepEqual([1, 2], [1, 2], 'deepEqual with same arrays');

assert.strictEqual(1, 1, 'strictEqual with same numbers');
assert.strictEqual('text', 'text', 'strictEqual with same strings');

assert.deepStrictEqual({ a: 1 }, { a: 1 }, 'deepStrictEqual with same objects');
assert.deepStrictEqual([1, 2], [1, 2], 'deepStrictEqual with same arrays');

assert.doesNotThrow(() => 1 + 1, 'doesNotThrow with non-throwing function');

assert.throws(() => {
  throw new Error('error');
}, 'throws with throwing function');

assert.notEqual(1, 2, 'notEqual with different numbers');

assert.notDeepEqual({ a: 1 }, { a: 2 }, 'notDeepEqual with different objects');

assert.notStrictEqual(
  1,
  '1',
  'notStrictEqual with loosely equal but not strictly equal values'
);

assert.notDeepStrictEqual(
  { a: 1 },
  { a: '1' },
  'notDeepStrictEqual with loosely equal but not strictly deep equal objects'
);

// TODO: Document compatibility from Node.js 12
// assert.match('hello world', /world/, 'match with matching string and regex');

// TODO: Document compatibility from Node.js 12
// assert.doesNotMatch(
//   'hello',
//   /world/,
//   'doesNotMatch with non-matching string and regex'
// );
