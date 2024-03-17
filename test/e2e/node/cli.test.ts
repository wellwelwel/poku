import { assert, describe, test } from '../../../src/index.js';
import {
  executeCLI,
  ext,
  isProduction,
} from '../../helpers/capture-cli.test.js';

test(async () => {
  describe('Poku Test Runner: CLI', { background: false, icon: '🐷' });

  const output = await executeCLI([
    ext === 'ts' || isProduction
      ? `src/bin/index.${ext}`
      : `ci/src/bin/index.${ext}`,
    ext === 'ts' || isProduction
      ? `test/integration/code.test.${ext}`
      : `ci/test/integration/code.test.${ext}`,
  ]);

  assert(/PASS › 1/.test(output), 'CLI needs to pass 1');
  assert(/FAIL › 0/.test(output), 'CLI needs to fail 0');
});
