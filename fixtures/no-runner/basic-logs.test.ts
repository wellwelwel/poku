import { assert } from '../../src/modules/essentials/assert.js';
import { test } from '../../src/modules/helpers/test.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

assert(true, 'Should emit a basic assetion log');

test('Should emit a basic test scope log', () => {
  // ...
});

describe('Should emit a basic test scope log', () => {
  // ...
});

it('Should emit a basic it scope log', () => {
  // ...
});

test('Should emit a basic test scope log', () => {
  assert(true, 'Should emit a basic assetion log');
});

describe('Should emit a basic test scope log', () => {
  assert(true, 'Should emit a basic assetion log');
});

it('Should emit a basic test scope log', () => {
  assert(true, 'Should emit a basic assetion log');
});

describe('Should emit a basic test scope log', () => {
  it('Should emit a basic it scope log', () => {
    // ...
  });
});

describe('Should emit a basic test scope log', () => {
  test('Should emit a basic test scope log', () => {
    // ...
  });
});

describe('Should emit a basic test scope log', () => {
  it('Should emit a basic it scope log', () => {
    assert(true, 'Should emit a basic assetion log');
  });
});

describe('Should emit a basic test scope log', () => {
  test('Should emit a basic test scope log', () => {
    assert(true, 'Should emit a basic assetion log');
  });
});
