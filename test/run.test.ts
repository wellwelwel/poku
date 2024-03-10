import { poku } from '../src/index.js';

poku(['test/unit', 'test/integration'], {
  parallel: true,
  debug: true,
});
