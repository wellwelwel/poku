import { assertPromise as assert, describe } from '../../src/index.js';
import { isNode10OrHigher } from '../../src/helpers/version-helper.js';

describe('Assert (Promise) Suite', { background: false, icon: '🔬' });

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

(async () => {
  const trueValue = true;
  await assert.ok(trueValue, 'Should resolve to true');

  const oneValue = 1;
  await assert.ok(oneValue, 'Should resolve to 1');

  const numberOne = 1;
  await assert.equal(numberOne, 1, 'Should resolve to equal 1');

  const textValue = 'text';
  await assert.equal(textValue, 'text', 'Should resolve to equal "text"');

  const objectValue = { a: 1 };
  await assert.deepEqual(
    objectValue,
    { a: 1 },
    'Should resolve to deep equal the object'
  );

  const arrayValue = [1, 2];
  await assert.deepEqual(
    arrayValue,
    [1, 2],
    'Should resolve to deep equal the array'
  );

  const strictNumber = 1;
  await assert.strictEqual(
    strictNumber,
    1,
    'Should resolve to strictly equal 1'
  );

  const strictText = 'text';
  await assert.strictEqual(
    strictText,
    'text',
    'Should resolve to strictly equal "text"'
  );

  const deepStrictObject = { a: 1 };
  await assert.deepStrictEqual(
    deepStrictObject,
    { a: 1 },
    'Should resolve to deep strictly equal the object'
  );

  const deepStrictArray = [1, 2];
  await assert.deepStrictEqual(
    deepStrictArray,
    [1, 2],
    'Should resolve to deep strictly equal the array'
  );

  await assert.doesNotThrow(
    () => Promise.resolve('no error'),
    'Should not throw an error'
  );

  if (isNode10OrHigher()) {
    await assert.rejects(
      async () => await Promise.reject(new Error('error')),
      Error('error'),
      'Should throw an error'
    );
  }

  const notEqualNumber = 1;
  await assert.notEqual(notEqualNumber, 2, 'Should resolve to not equal 2');

  const notDeepEqualObject = { a: 1 };
  await assert.notDeepEqual(
    notDeepEqualObject,
    { a: 2 },
    'Should resolve to not deep equal the object'
  );

  const notStrictEqualNumber = 1;
  await assert.notStrictEqual(
    notStrictEqualNumber,
    '2',
    'Should resolve to not strictly equal "2"'
  );

  const notDeepStrictEqualObject = { a: 1 };
  await assert.notDeepStrictEqual(
    notDeepStrictEqualObject,
    { a: '2' },
    'Should resolve to not deep strictly equal the object'
  );
})();
