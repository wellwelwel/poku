import { assert } from '../../../../../src/modules/essentials/assert.js';
import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it/core.js';

let counter = 0;

it('Should skip', () => {
  counter++;
});

describe.only('Should run', () => {
  it('Should run', () => {
    counter++;
  });
});

describe('Should skip', () => {
  counter++;

  it('Should never be called', () => {
    counter++;
  });

  it.only('Should never be called', () => {
    counter++;
  });
});

assert.strictEqual(counter, 2);
