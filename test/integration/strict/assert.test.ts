import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';
import { getRuntime, nodeVersion } from '../../../src/parsers/get-runtime.js';
import { skip } from '../../../src/modules/helpers/skip.js';

if ((nodeVersion && nodeVersion < 16) || getRuntime() === 'deno') {
  skip('Strict method is available from Node.js 16');
}

describe('Strict Suite', async () => {
  const { strict: assert } = await import(
    '../../../src/modules/essentials/strict.js'
  );

  it(() => {
    assert(true, 'ok (default) with true');
    assert(1, 'ok (default) with 1');
    assert('string', 'ok (default) with string');
    assert([], 'ok (default) with empty array');
    assert({}, 'ok (default) with empty object');
    assert(() => {}, 'ok (default) with empty function');
    assert(3 > 2, 'ok (default) 3 should be greater than 2');
  });

  it(() => {
    assert.ok(true, 'ok with true');
    assert.ok(1, 'ok with 1');
    assert.ok('string', 'ok with string');
    assert.ok([], 'ok with empty array');
    assert.ok({}, 'ok with empty object');
    assert.ok(() => {}, 'ok with empty function');
    assert.ok(3 > 2, '3 should be greater than 2');
  });

  it(() => {
    assert.equal(1, 1, 'equal with same numbers');
    assert.equal('text', 'text', 'equal with same strings');
    assert.equal(2 + 2, 4, '2 + 2 should equal 4');
    assert.equal(
      'Hello'.toUpperCase(),
      'HELLO',
      'toUpperCase should convert to all upper case'
    );
  });

  it(() => {
    assert.deepEqual({ a: 1 }, { a: 1 }, 'deepEqual with same objects');
    assert.deepEqual([1, 2], [1, 2], 'deepEqual with same arrays');
    assert.deepEqual(
      [2, 3, 4],
      [2, 3, 4],
      'Arrays [2, 3, 4] should be deeply equal'
    );
    assert.deepEqual(
      [1, 2, 3].reverse(),
      [3, 2, 1],
      'Reversing [1, 2, 3] should give [3, 2, 1]'
    );
  });

  it(() => {
    assert.strictEqual(1, 1, 'strictEqual with same numbers');
    assert.strictEqual('text', 'text', 'strictEqual with same strings');
    assert.strictEqual(2 * 2, 4, '2 * 2 should be strictly equal to 4');
  });

  it(() => {
    assert.deepStrictEqual(
      { a: 1 },
      { a: 1 },
      'deepStrictEqual with same objects'
    );
    assert.deepStrictEqual([1, 2], [1, 2], 'deepStrictEqual with same arrays');
    assert.deepStrictEqual(
      { a: 1, b: 2 },
      { a: 1, b: 2 },
      'Objects { a: 1, b: 2 } should be deeply and strictly equal'
    );
  });

  it(() => {
    assert.notEqual(1, 2, 'notEqual with different numbers');
    assert.notEqual(2 + 2, 5, '2 + 2 should not equal 5');
    assert.notEqual(
      'Hello'.toLowerCase(),
      'HELLO',
      'toLowerCase should not match the upper case version'
    );
  });

  it(() => {
    assert.notStrictEqual(1, true, 'notStrictEqual with different types');
    assert.notStrictEqual(
      1,
      '1',
      'notStrictEqual with loosely equal but not strictly equal values'
    );
    assert.notStrictEqual(
      2 * 2,
      '4',
      '2 * 2 should not be strictly equal to "4"'
    );
    assert.notStrictEqual(2, '2', '2 should not be strictly equal to "2"');
  });

  it(() => {
    assert.notDeepEqual(
      { a: 1 },
      { a: 2 },
      'notDeepEqual with different objects'
    );
    assert.notDeepEqual(
      [2, 3, 4],
      [4, 5, 6],
      'Arrays [2, 3, 4] and [4, 5, 6] should not be deeply equal'
    );
  });

  it(() => {
    assert.notDeepStrictEqual(
      { a: 1 },
      { a: '1' },
      'notDeepStrictEqual with loosely equal but not strictly deep equal objects'
    );
    assert.notDeepStrictEqual(
      [1, 2, 3],
      [1, 2, '3'],
      '[1, 2, 3] should not be deeply strictly equal to [1, 2, "3"]'
    );
    assert.notDeepStrictEqual(
      { a: 1 },
      { a: '1' },
      'Objects { a: 1 } and { a: "1" } should not be deeply and strictly equal'
    );
  });

  const callbackFunction = (
    cb: (err: Error | null, result?: string) => void
  ) => {
    cb(null, 'no error');
  };

  it(() => {
    assert.ifError(null, 'ifError did not throw an error for null');
    assert.ifError(undefined, 'ifError did not throw an error for undefined');
  });

  it(() => {
    if (!nodeVersion || nodeVersion > 8) {
      const obj = { a: 1 };

      const functionThatThrows = () => {
        throw new Error('Specific error');
      };

      it(() => {
        assert.throws(() => {
          throw new Error('error');
        }, 'throws with throwing function');
        assert.throws(() => {
          throw new Error('Test error');
        }, 'Should throw an exception for a function that generates an error');
        assert.throws(() => {
          throw new Error('Test error');
        }, 'Should throw an error for a function that actually throws');
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
          (err) => err instanceof Error && err.message === 'Specific error',
          'Should throw an error where the message equals the specific string'
        );
      });

      it(() => {
        assert.doesNotThrow(
          () => 1 + 1,
          'doesNotThrow with non-throwing function'
        );

        assert.doesNotThrow(() => {
          obj.a = 2;
        }, 'Changing property should not throw');
        assert.strictEqual(obj.a, 2, 'Property a should be 2 after mutation');

        // Test to check functions that do or do not throw errors
        assert.doesNotThrow(() => {
          return 42;
        }, 'Should not throw an exception for a function returning 42');

        assert.doesNotThrow(
          () =>
            callbackFunction((err) => {
              assert.ifError(err);
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

        assert.doesNotThrow(
          () => 'no error',
          'Should not throw an error for an async function that resolves'
        );

        assert.doesNotThrow(
          () => {
            return 'test';
          },
          /test/,
          'RegExp predicate should not match'
        );
      });
    }
  });

  it(() => {
    if (!nodeVersion || nodeVersion > 12) {
      const text = 'sample text';

      it(() => {
        assert.match(text, /sample/, 'Text should match the regex');
      });

      it(() => {
        assert.doesNotMatch(
          text,
          /notpresent/,
          'Text should not match the regex'
        );
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
      });
    }
  });

  await it(async () => {
    if (!nodeVersion || nodeVersion > 10) {
      const asyncFunctionThatRejects = async () =>
        await Promise.reject(new Error('Async error'));

      const asyncFunctionThatResolves = () =>
        Promise.resolve('Resolved successfully');

      const asyncFunctionThatFails = () =>
        new Promise((_, reject) => reject(new Error('Failed')));

      const asyncFunctionThatCouldReject = () =>
        new Promise((resolve) => resolve(undefined));

      await it(async () => {
        await assert.rejects(
          async () => await asyncFunctionThatFails(),
          new Error('Failed'),
          'Async function should reject with an error'
        );
        await assert.rejects(
          asyncFunctionThatRejects,
          new Error('Async error'),
          'Should reject with an Error object with "Async error" message'
        );
        await assert.rejects(
          () => Promise.reject('Simple rejection'),
          (err) => err === 'Simple rejection',
          'Should handle rejection with a simple string message'
        );
        await assert.rejects(
          asyncFunctionThatRejects,
          new Error('Async error'),
          'Should reject with the specified error message'
        );
        await assert.rejects(
          asyncFunctionThatRejects,
          /Async error/,
          'Should reject with the specified regex message'
        );
        await assert.rejects(
          asyncFunctionThatRejects,
          { message: 'Async error' },
          'Should reject with the specified object predicate message'
        );
        await assert.rejects(
          asyncFunctionThatRejects,
          (err: Error) => err.message === 'Async error',
          'Should reject with the specified function predicate message'
        );
        await assert.rejects(
          asyncFunctionThatRejects,
          'Should reject with the specified string message'
        );
        await assert.rejects(
          asyncFunctionThatRejects,
          // @ts-expect-error invalid second param
          undefined,
          'Should reject with the specified string message (third arg)'
        );
        await assert.rejects(asyncFunctionThatRejects);
      });

      await it(async () => {
        await assert.doesNotReject(
          asyncFunctionThatResolves,
          'Should not reject for a function that resolves'
        );
        await assert.doesNotReject(
          asyncFunctionThatResolves,
          'Should not reject for a function that resolves'
        );
        await assert.doesNotReject(
          Promise.resolve('Immediate resolve'),
          'Should not reject for an immediately resolving promise'
        );
        await assert.doesNotReject(
          asyncFunctionThatCouldReject,
          'Should not reject for a function that could reject but resolves instead'
        );
        await assert.doesNotReject(
          () => Promise.resolve('Async function with no rejection'),
          'Should handle async functions that do not reject'
        );
        await assert.doesNotReject(
          asyncFunctionThatResolves,
          /Resolved successfully/
        );
      });
    }
  });
});
