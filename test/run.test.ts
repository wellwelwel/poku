import { poku } from '../src/modules/essentials/poku.js';

poku(['test/unit', 'test/integration', 'test/e2e'], {
  parallel: true,
  debug: true,
  deno: {
    allow: ['read', 'write', 'hrtime', 'env', 'run', 'net'],
  },
});
