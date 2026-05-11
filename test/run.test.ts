import { poku } from '../src/modules/essentials/poku.js';

poku(['test/unit', 'test/integration', 'test/e2e'], {
  debug: true,
  timeout: 30000,
  deno: {
    allow: ['read', 'write', 'env', 'run', 'net'],
  },
});
