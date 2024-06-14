import { poku } from '../src/modules/poku.js';

poku(['test/unit', 'test/integration', 'test/e2e'], {
  parallel: true,
  debug: true,
  deno: {
    allow: ['read', 'write', 'hrtime', 'env', 'run', 'net'],
  },
});
