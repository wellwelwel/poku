import { assert } from '../../src/index.js';
import { padStart } from '../../src/helpers/pad.js';

assert.deepStrictEqual(padStart('', 0, ''), '');
assert.deepStrictEqual(padStart('', 2, ' '), '  ');
assert.deepStrictEqual(padStart('1234', 0, ' '), '1234');
assert.deepStrictEqual(padStart('1', 4, '0'), '0001');
assert.deepStrictEqual(padStart('1234', 4, '0'), '1234');
assert.deepStrictEqual(padStart('12345', 4, '0'), '12345');
assert.deepStrictEqual(padStart('hi', 3, ''), ' hi');
assert.strictEqual(padStart('abc', 5, ' '), '  abc');
assert.strictEqual(padStart('abc', 5, ''), '  abc');
assert.strictEqual(padStart('abc', 3, 'x'), 'abc');
assert.strictEqual(padStart('abcde', 3, 'x'), 'abcde');
assert.strictEqual(padStart('abc', 5, 'x'), 'xxabc');
assert.strictEqual(padStart('', 3, 'x'), 'xxx');
assert.strictEqual(padStart('abc', 6, '123'), '123abc');
assert.deepStrictEqual(padStart('a', 5, '123'), '1231a');
assert.deepStrictEqual(padStart('a', 3, '12'), '12a');

// @ts-expect-error wrong param
assert.deepStrictEqual(padStart('12345', 4), '12345');

// @ts-expect-error wrong param
assert.deepStrictEqual(padStart('12345', 4, undefined), '12345');

// @ts-expect-error wrong param
assert.strictEqual(padStart('abc', 5), '  abc');
