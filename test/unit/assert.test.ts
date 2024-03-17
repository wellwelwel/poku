import { assert, describe } from '../../src/index.js';

describe('Assert Suite', { background: false, icon: '🔬' });

assert.ok(1, 'ok with 1');
assert.ok('string', 'ok with string');
assert.ok([], 'ok with empty array');
assert.ok({}, 'ok with empty object');

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
assert.notEqual(1, '1', 'notEqual with loosely type checking');

assert.notStrictEqual(1, true, 'notStrictEqual with different types');

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

// Simple tests to check boolean values
assert.ok(true, 'Should be true');
assert.ok(!false, 'Negating false should be true');

// Test to check equality of numbers
assert.equal(2 + 2, 4, '2 + 2 should equal 4');
assert.notEqual(2 + 2, 5, '2 + 2 should not equal 5');

// Test to check strict equality
assert.strictEqual(2 * 2, 4, '2 * 2 should be strictly equal to 4');
assert.notStrictEqual(2 * 2, '4', '2 * 2 should not be strictly equal to "4"');

// Test to check deep equality
assert.deepEqual(
  [2, 3, 4],
  [2, 3, 4],
  'Arrays [2, 3, 4] should be deeply equal'
);
assert.notDeepEqual(
  [2, 3, 4],
  [4, 5, 6],
  'Arrays [2, 3, 4] and [4, 5, 6] should not be deeply equal'
);

// Test to check functions that do or do not throw errors
assert.doesNotThrow(() => {
  return 42;
}, 'Should not throw an exception for a function returning 42');
assert.throws(() => {
  throw new Error('Test error');
}, 'Should throw an exception for a function that generates an error');

// Tests to check deep and strict equality
assert.deepStrictEqual(
  { a: 1, b: 2 },
  { a: 1, b: 2 },
  'Objects { a: 1, b: 2 } should be deeply and strictly equal'
);
assert.notDeepStrictEqual(
  { a: 1 },
  { a: '1' },
  'Objects { a: 1 } and { a: "1" } should not be deeply and strictly equal'
);

// Testing numeric comparisons
assert.ok(3 > 2, '3 should be greater than 2');
assert.notStrictEqual(2, '2', '2 should not be strictly equal to "2"');

// Testing string operations
assert.equal(
  'Hello'.toUpperCase(),
  'HELLO',
  'toUpperCase should convert to all upper case'
);
assert.notEqual(
  'Hello'.toLowerCase(),
  'HELLO',
  'toLowerCase should not match the upper case version'
);

// Testing array operations
assert.deepEqual(
  [1, 2, 3].reverse(),
  [3, 2, 1],
  'Reversing [1, 2, 3] should give [3, 2, 1]'
);
assert.notDeepStrictEqual(
  [1, 2, 3],
  [1, 2, '3'],
  '[1, 2, 3] should not be deeply strictly equal to [1, 2, "3"]'
);

// Testing object mutations
const obj = { a: 1 };
assert.doesNotThrow(() => {
  obj.a = 2;
}, 'Changing property should not throw');
assert.strictEqual(obj.a, 2, 'Property a should be 2 after mutation');

// Testing async functions
// Corrigindo o teste para refletir uma operação que deve rejeitar
const asyncFunctionThatFails = () =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Failed')), 100)
  );

assert.rejects(
  // eslint-disable-next-line require-await
  async () => asyncFunctionThatFails(),
  new Error('Failed'),
  'Async function should reject with an error'
);

// Testing regex matches
const text = 'sample text';
assert.match(text, /sample/, 'Text should match the regex');
assert.doesNotMatch(text, /notpresent/, 'Text should not match the regex');
