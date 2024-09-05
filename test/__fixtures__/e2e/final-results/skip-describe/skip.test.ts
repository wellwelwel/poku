import { exit } from 'node:process';
import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it/core.js';

describe.skip('Some skip', () => {
  exit(1);
});

describe.skip('Multiple skips in the same file should not be counted', () => {
  exit(1);
});

it.skip('Mixed skips in the same file should not be counted', () => {
  exit(1);
});
