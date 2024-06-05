import { assert, describe, test } from '../../src/index.js';
import { executeCLI, ext, isProduction } from '../helpers/capture-cli.test.js';
import { getRuntime } from '../../src/helpers/get-runtime.js';

const runtime = getRuntime();

if (runtime === 'deno' && !isProduction) process.exit(0);

test(async () => {
  describe('Poku Test Runner: CLI', { icon: '🐷' });

  const output = await executeCLI([
    ext === 'ts' || isProduction
      ? `src/bin/index.${ext}`
      : `ci/src/bin/index.${ext}`,
    ext === 'ts' || isProduction
      ? `test/e2e/exit-code.test.${ext}`
      : `ci/test/e2e/exit-code.test.${ext}`,
  ]);

  assert(/PASS › 1/.test(output), 'CLI needs to pass 1');
  assert(/FAIL › 0/.test(output), 'CLI needs to fail 0');
});
