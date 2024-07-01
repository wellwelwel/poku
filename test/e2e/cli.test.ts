import { test } from '../../src/modules/helpers/test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { executeCLI, ext, isProduction } from '../helpers/capture-cli.test.js';
import { getRuntime } from '../../src/parsers/get-runtime.js';

const runtime = getRuntime();

if (runtime === 'deno' && !isProduction) {
  process.exit(0);
}

test('Poku Test Runner: CLI', async () => {
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
