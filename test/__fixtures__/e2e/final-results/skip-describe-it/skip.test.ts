import { exit } from 'node:process';
import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it/core.js';

describe('Dont skip', () => {
  it.skip('Mixed skips in the same file should not be counted', () => {
    exit(1);
  });
});
