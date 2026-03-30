import { test } from '../../../../src/modules/helpers/test.js';

test('in-process exitCode', () => {
  process.exitCode = 1;
});
