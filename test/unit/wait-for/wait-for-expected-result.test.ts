import { test } from '../../../src/modules/helpers/test.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { waitForExpectedResult } from '../../../src/modules/helpers/wait-for.js';
import { getRuntime } from '../../../src/parsers/get-runtime.js';

test('Wait For Expected Result', async () => {
  const runtime = getRuntime();

  class SomeClass {}
  function someFunc() {
    true;
  }
  const SomeClass2 = class {};
  const someFunc2 = () => true;

  await Promise.all([
    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => Promise.resolve(someFunc), someFunc, {
          timeout: 100,
        }),
      'Function'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => Promise.resolve(someFunc2), someFunc2, {
          timeout: 100,
        }),
      'Function (as const)'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(
          () => Promise.resolve(() => true),
          () => true,
          {
            timeout: 100,
          }
        ),
      'Function (anonymous)'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => Symbol(), Symbol(), {
          timeout: 100,
        }),
      'Symbol'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => Symbol.for('test'), Symbol.for('test'), {
          timeout: 100,
        }),
      'Symbol.for'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => new Set([1, 2]), new Set([1, 1, 2, 2]), {
          timeout: 100,
        }),
      'Set'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => new Map([[1, 2]]), new Map([[1, 2]]), {
          timeout: 100,
        }),
      'Map'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => [false, 5], [false, 5], {
          timeout: 100,
        }),
      'Array'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(
          () => ({ a: true }),
          { a: true },
          {
            timeout: 100,
          }
        ),
      'Object'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => 'Hi', 'Hi', {
          timeout: 100,
        }),
      'String'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => true, true, {
          timeout: 100,
        }),
      'Boolean (true)'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => false, false, {
          timeout: 100,
        }),
      'Boolean (false)'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => 3, 3, {
          timeout: 100,
        }),
      'Number'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => {}, undefined, {
          timeout: 100,
        }),
      'Undefined (Implict)'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => undefined, undefined, {
          timeout: 100,
        }),
      'Undefined (Explict)'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => new Error('Some'), new Error('Some'), {
          timeout: 100,
        }),
      'Error'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => SomeClass, SomeClass, {
          timeout: 100,
        }),
      'Class'
    ),

    assert.doesNotReject(
      () =>
        waitForExpectedResult(() => SomeClass2, SomeClass2, {
          timeout: 100,
        }),
      'Class (as const)'
    ),

    runtime === 'node' &&
      assert.doesNotReject(
        () =>
          waitForExpectedResult(() => 1, true, {
            timeout: 100,
            strict: false,
          }),
        'No Strict Comparison'
      ),

    assert.rejects(
      () =>
        waitForExpectedResult(() => 1, true, {
          timeout: 100,
          strict: true,
        }),
      'Strict Comparison'
    ),
  ]);
});
