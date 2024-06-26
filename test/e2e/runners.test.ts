import process from 'node:process';
import { execSync } from 'node:child_process';
import { describe } from '../../src/modules/describe.js';
import { it } from '../../src/modules/it.js';
import { assert } from '../../src/modules/assert.js';
import { isProduction, inspectCLI } from '../helpers/capture-cli.test.js';

if (isProduction) {
  process.exit(0);
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
        'npx tsx src/bin/index.ts --platform=node fixtures/extensions'
      );

      assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
      assert(/PASS › 12/.test(output.stdout), 'CLI needs to pass 1');
      assert(/FAIL › 0/.test(output.stdout), 'CLI needs to fail 0');
      assert(/node.+?\.js/.test(output.stdout), '.js => node');
      assert(/node.+?\.cjs/.test(output.stdout), '.cjs => node');
      assert(/node.+?\.mjs/.test(output.stdout), '.mjs => node');
      assert(/tsx.+?\.ts/.test(output.stdout), '.ts => tsx');
      assert(/tsx.+?\.cts/.test(output.stdout), '.cts => tsx');
      assert(/tsx.+?\.mts/.test(output.stdout), '.mts => tsx');
    }));

  hasBun &&
    (await it('Bun', async () => {
      const output = await inspectCLI(
        'bun src/bin/index.ts --platform=bun fixtures/extensions'
      );

      assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
      assert(/PASS › 12/.test(output.stdout), 'CLI needs to pass 1');
      assert(/FAIL › 0/.test(output.stdout), 'CLI needs to fail 0');
      assert(/bun.+?.js/.test(output.stdout), 'bun => .js');
      assert(/bun.+?.cjs/.test(output.stdout), 'bun => .cjs');
      assert(/bun.+?.mjs/.test(output.stdout), 'bun => .mjs');
      assert(/bun.+?.ts/.test(output.stdout), 'bun => .ts');
      assert(/bun.+?.cts/.test(output.stdout), 'bun => .cts');
      assert(/bun.+?.mts/.test(output.stdout), 'bun => .mts');
    }));

  hasDeno &&
    (await it('Deno', async () => {
      const output = await inspectCLI(
        'deno run --unstable-sloppy-imports --allow-read --allow-env --allow-run src/bin/index.ts --platform=deno fixtures/extensions'
      );

      assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
      assert(/PASS › 12/.test(output.stdout), 'CLI needs to pass 1');
      assert(/FAIL › 0/.test(output.stdout), 'CLI needs to fail 0');
      assert(/deno run.+?.js/.test(output.stdout), 'deno => .js');
      assert(/deno run.+?.cjs/.test(output.stdout), 'deno => .cjs');
      assert(/deno run.+?.mjs/.test(output.stdout), 'deno => .mjs');
      assert(/deno run.+?.ts/.test(output.stdout), 'deno => .ts');
      assert(/deno run.+?.cts/.test(output.stdout), 'deno => .cts');
      assert(/deno run.+?.mts/.test(output.stdout), 'deno => .mts');
    }));
});
