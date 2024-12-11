import { execSync } from 'node:child_process';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectCLI, isBuild } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isBuild) {
  skip();
}

const hasNode = (() => {
  try {
    execSync('node -v', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

const hasDeno = (() => {
  try {
    execSync('deno -v', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

const hasBun = (() => {
  try {
    execSync('bun -v', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

describe('Test Runtimes/Platforms + Extensions', async () => {
  hasNode &&
    (await it('Node.js', async () => {
      const output = await inspectCLI(
        'npx tsx src/bin/index.ts --platform=node test/__fixtures__/e2e/extensions -d'
      );

      if (output.exitCode !== 0) {
        console.log(output.stdout);
        console.log(output.stderr);
      }

      assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
      assert(/PASS › 12/.test(output.stdout), 'CLI needs to pass 1');
      assert(/FAIL › 0/.test(output.stdout), 'CLI needs to fail 0');
    }));

  hasBun &&
    (await it('Bun', async () => {
      const output = await inspectCLI(
        'bun src/bin/index.ts --platform=bun test/__fixtures__/e2e/extensions -d'
      );

      if (output.exitCode !== 0) {
        console.log(output.stdout);
        console.log(output.stderr);
      }

      assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
      assert(/PASS › 12/.test(output.stdout), 'CLI needs to pass 1');
      assert(/FAIL › 0/.test(output.stdout), 'CLI needs to fail 0');
    }));

  hasDeno &&
    (await it('Deno', async () => {
      const output = await inspectCLI(
        'deno run --unstable-sloppy-imports --allow-read --allow-env --allow-run src/bin/index.ts --platform=deno test/__fixtures__/e2e/extensions -d --exclude=.cts'
      );

      if (output.exitCode !== 0) {
        console.log(output.stdout);
        console.log(output.stderr);
      }

      assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
      assert(/PASS › 10/.test(output.stdout), 'CLI needs to pass 1');
      assert(/FAIL › 0/.test(output.stdout), 'CLI needs to fail 0');
    }));
});
