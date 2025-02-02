import { assert } from '../../../../src/modules/essentials/assert.js';
import { describe } from '../../../../src/modules/helpers/describe.js';
import { afterEach, beforeEach } from '../../../../src/modules/helpers/each.js';
import { it } from '../../../../src/modules/helpers/it/core.js';
import { test } from '../../../../src/modules/helpers/test.js';

let counter = 0;
let beforeHookCounter = 0;
let afterHookCounter = 0;

beforeEach(() => {
  beforeHookCounter++;
});

afterEach(() => {
  afterHookCounter++;
});

describe('1', () => {
  counter++; // ✅ `describe` scope will be executed as it's in "native" JavaScript flow

  it.only('2', () => {
    counter++; // ✅ `it.only` will be executed
  });

  it('3', () => {
    counter++; // ⏭️ `it` will be skipped
  });

  test.only('4', () => {
    counter++; // ✅ `test.only` will be executed
  });

  test('5', () => {
    counter++; // ⏭️ `test` will be skipped
  });
});

counter++; // ✅ Will be executed as it's in "native" JavaScript flow
assert.strictEqual(counter, 4, 'Ensure JavaScript natural flow');

test('6', () => {
  counter++; // ⏭️ `test` will be skipped
});

test.only('7', () => {
  counter++; // ✅ `test.only` will be executed
});

it('8', () => {
  counter++; // ⏭️ `it` will be skipped
});

it.only('9', () => {
  counter++; // ✅ `it.only` will be executed
});

assert.strictEqual(counter, 6, '1 describe + 2 it + 2 test + 1 "natural"');
assert.strictEqual(beforeHookCounter, 4, '2 test + 2 it');
assert.strictEqual(afterHookCounter, 4, '2 test + 2 it');
