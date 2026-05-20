import { exit } from 'node:process';
import { it } from '../../../../../src/modules/helpers/it.js';

it.skip('Some skip', () => {
  exit(1);
});

it.skip('Multiple skips in the same file should not be counted', () => {
  exit(1);
});

it.skip(() => {
  exit(1);
});
