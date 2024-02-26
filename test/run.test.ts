import { poku } from '../src/index.js';

poku(['./test/unit', './test/integration'], {
  parallel: true,
});

// poku(['./test/unit']);
