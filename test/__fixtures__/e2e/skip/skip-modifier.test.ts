import { describe } from '../../../../src/modules/helpers/describe.js';
import { test } from '../../../../src/modules/helpers/test.js';
import { it } from '../../../../src/modules/helpers/it/core.js';
import { exit } from 'node:process';

describe.skip('1', () => {
  exit(1);
});

describe.skip(() => {
  exit(1);
});

it.skip('2', () => {
  exit(1);
});

it.skip(() => {
  exit(1);
});

test.skip('3', () => {
  exit(1);
});

test.skip(() => {
  exit(1);
});
