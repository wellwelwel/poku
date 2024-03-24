import { poku } from '../src/index.js';

poku(['test/unit', 'test/integration', 'test/e2e'], {
  parallel: true,
  debug: true,
});
