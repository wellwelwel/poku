import { assert } from '../../../../../src/modules/essentials/assert.js';
import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it/core.js';

let counter = 0;

it('Should skip', () => {
  counter++;
});

it.only('Should run', () => {
  counter++;
});

it('Should skip', () => {
  counter++;
});

describe('Should skip', () => {
  it('Should never be called', () => {
    counter++;
  });

  it.only('Should never be called', () => {
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

describe.only('Should run', () => {
  it.only('Should run', () => {
    counter++;
  });
});

assert.strictEqual(counter, 3);
