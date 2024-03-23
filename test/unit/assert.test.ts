import { assert, describe } from '../../src/index.js';
import {
  isNode12OrHigher,
  isNode10OrHigher,
} from '../../src/helpers/version-helper.js';

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

describe('ifError Test Suite', { background: false, icon: '🔬' });

assert.ifError(null, 'ifError did not throw an error for null');
assert.ifError(undefined, 'ifError did not throw an error for undefined');

describe('doesNotMatch Test Suite', { background: false, icon: '🔬' });
if (isNode12OrHigher()) {
  assert.doesNotMatch(
    'abc',
    /123/,
    'String "abc" should not match the pattern /123/'
  );

  assert.doesNotMatch(
    '',
    /\d/,
    'Empty string should not match the pattern /d/'
  );

  assert.doesNotMatch(
    'abc',
    /\d+/,
    'String "abc" should not match the pattern /d+/'
  );
}

describe('doesNotThrow Test Suite', { background: false, icon: '🔬' });

function callbackFunction(cb: (err: Error | null, result?: string) => void) {
  // Simula uma operação que não lança um erro
  cb(null, 'no error');
}

assert.doesNotThrow(
  () =>
    callbackFunction((err, result) => {
      if (err) {
        throw err;
      }
      console.log(result); // Saída esperada: 'no error'
    }),
  'Should not throw an error for a callback function that does not error'
);

assert.doesNotThrow(
  () => 42,
  'Should not throw an error for a function returning a number'
);

assert.doesNotThrow(
  () => 'no error',
  'Should not throw an error for a function returning a string'
);

assert.throws(() => {
  throw new Error('Test error');
}, 'Should throw an error for a function that actually throws');

assert.doesNotThrow(
  async () => await 'no error',
  'Should not throw an error for an async function that resolves'
);

describe('throws Test Suite', { background: false, icon: '🔬' });

const functionThatThrows = () => {
  throw new Error('Specific error');
};

assert.throws(
  functionThatThrows,
  new Error('Specific error'),
  'Should throw the specific error'
);

assert.throws(
  functionThatThrows,
  /Specific error/,
  'Should throw an error matching the regex'
);

assert.throws(
  functionThatThrows,
  // @ts-expect-error: Testing unexpected error type for demonstration
  (err) => err.message === 'Specific error',
  'Should throw an error where the message equals the specific string'
);

describe('rejects Test Suite', { background: false, icon: '🔬' });

// eslint-disable-next-line require-await

describe('doesNotReject Test Suite', { background: false, icon: '🔬' });
if (isNode10OrHigher()) {
  // Test where the promise resolves successfully
  const asyncFunctionThatResolves = () => {
    return Promise.resolve('Resolved successfully');
  };

  // This should pass because the function resolves
  assert.doesNotReject(
    asyncFunctionThatResolves,
    'Should not reject for a function that resolves'
  );

  // Test with a promise that resolves immediately
  assert.doesNotReject(
    Promise.resolve('Immediate resolve'),
    'Should not reject for an immediately resolving promise'
  );

  // Test where the promise could reject but does not
  const asyncFunctionThatCouldReject = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Delayed resolve');
      }, 100);
    });
  };

  assert.doesNotReject(
    asyncFunctionThatCouldReject,
    'Should not reject for a function that could reject but resolves instead'
  );

  // Test using async function but with no rejection happening
  assert.doesNotReject(
    () => Promise.resolve('Async function with no rejection'),
    'Should handle async functions that do not reject'
  );

  // Ensure it handles cases where no arguments are passed to doesNotReject
  assert.doesNotReject(
    asyncFunctionThatResolves,
    'Should handle cases with no specific error argument in doesNotReject'
  );
}

describe('match Test Suite', { background: false, icon: '🔬' });

// Testing regex matches
const text = 'sample text';
if (isNode12OrHigher()) {
  assert.match(text, /sample/, 'Text should match the regex');
  assert.doesNotMatch(text, /notpresent/, 'Text should not match the regex');
}

describe('rejects Test Suite', { background: false, icon: '🔬' });

if (isNode10OrHigher()) {
  const asyncFunctionThatRejects = async () => {
    await Promise.reject(new Error('Async error'));
  };
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
  assert.rejects(
    asyncFunctionThatRejects,
    new Error('Async error'),
    'Should reject with an Error object with "Async error" message'
  );
  assert.rejects(
    () => Promise.reject('Simple rejection'),
    (err) => err === 'Simple rejection',
    'Should handle rejection with a simple string message'
  );

  assert.rejects(
    asyncFunctionThatRejects,
    new Error('Async error'),
    'Should reject with the specified error message'
  );
}
