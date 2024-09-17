import { test } from '../../../../../src/modules/helpers/test.js';
import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it/core.js';
import {
  beforeEach,
  afterEach,
} from '../../../../../src/modules/helpers/each.js';
import { assert } from '../../../../../src/modules/essentials/assert.js';

beforeEach(() => {
  // It will run normally before all `it.only` and `test.only`.
});

afterEach(() => {
  // It will run normally after all `it.only` and `test.only`.
});

let counter = 0;

// ⬇️ `describe` scopes ⬇️

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

// ⬇️ Top-level or non-`describe` scopes ⬇️

counter++; // ✅ Will be executed as it's in "native" JavaScript flow

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

// describe.only('10', () => {
//   counter++; // ❌ It would force a failure since `describe.only` is not enabled in `--only=it`
// });

assert.strictEqual(counter, 6);
