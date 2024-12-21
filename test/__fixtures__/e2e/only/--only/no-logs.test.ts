import { assert } from '../../../../../src/modules/essentials/assert.js';
import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it/core.js';

let counter = 0;

it(() => {
  counter++;
});

it.only(() => {
  counter++;
});

it(() => {
  counter++;
});

describe(() => {
  it(() => {
    counter++;
  });

  it.only(() => {
    counter++;
  });
});

describe.only(() => {
  it(() => {
    counter++;
  });

  it.only(() => {
    counter++;
  });
});

describe.only(() => {
  it.only(() => {
    counter++;
  });
});

assert.strictEqual(counter, 4);
