import { poku } from '../src/modules/poku.js';

poku(['./test/compatibility'], {
  parallel: true,
  debug: true,
});
