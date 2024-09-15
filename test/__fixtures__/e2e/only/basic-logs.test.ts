import { test } from '../../../../src/modules/helpers/test.js';
import { assert } from '../../../../src/modules/essentials/assert.js';
import { describe } from '../../../../src/modules/helpers/describe.js';
import { it } from '../../../../src/modules/helpers/it/core.js';

let counter = 0;

test('Should skip', () => {
  counter++;
});

test.only('Should run', () => {
  counter++;
});

test('Should skip', () => {
  counter++;
});

describe('Should skip', () => {
  test.only('Should never be called', () => {
    counter++;
  });
});

describe.only('Should run', () => {
  it('Should skip', () => {
    counter++;
  });

  it.only('Should run', () => {
    counter++;
  });
});

assert.strictEqual(counter, 2);
