import { poku } from '../src/modules/essentials/poku.js';

poku(['test/unit', 'test/integration', 'test/e2e'], {
  debug: true,
  deno: {
    allow: ['read', 'write', 'env', 'run', 'net'],
  },
});
