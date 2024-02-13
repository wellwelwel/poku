import { poku } from '../src/index.js';

poku(['./test/integration', './test/unit'], {
  parallel: true,
});
