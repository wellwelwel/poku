import { mkdir, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import {
  LIB_CJS,
  LIB_ESM,
  skipUnlessBuilt,
} from '../__utils__/skip-unless-built.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';

skipUnlessBuilt();

const DIR = 'test/__fixtures__/.temp/dual-bundle-state';
const PASS_FILE = `${DIR}/pass.test.js`;
const FAIL_FILE = `${DIR}/fail.test.js`;
const PASS_CONTENT =
  "import assert from 'node:assert';\nassert.strictEqual(1 + 1, 2);\n";
const FAIL_CONTENT =
  "import assert from 'node:assert';\nassert.strictEqual(1 + 1, 3);\n";

const require = createRequire(import.meta.url);

describe('Dual-bundle state isolation (#1111 regression)', async () => {
  await rm(DIR, { recursive: true, force: true });
  await mkdir(DIR, { recursive: true });

  try {
    await writeFile(PASS_FILE, PASS_CONTENT, 'utf8');
    await writeFile(FAIL_FILE, FAIL_CONTENT, 'utf8');

    const cjsBundle = require(
      LIB_CJS
    ) as typeof import('../../src/modules/index.js');
    const esmBundle = await import(LIB_ESM);

    it('CJS and ESM bundles must expose poku as a callable function', () => {
      assert.strictEqual(
        typeof cjsBundle.poku,
        'function',
        'cjs.poku must be a function'
      );
      assert.strictEqual(
        typeof esmBundle.poku,
        'function',
        'esm.poku must be a function'
      );
    });

    await it('PluginContext.results must be shared across CJS and ESM bundles', async () => {
      let cjsContextResults: unknown = null;
      let esmContextResults: unknown = null;

      const captureCjs = {
        name: 'capture-cjs',
        setup(ctx: { results: unknown }) {
          cjsContextResults = ctx.results;
        },
      };
      const captureEsm = {
        name: 'capture-esm',
        setup(ctx: { results: unknown }) {
          esmContextResults = ctx.results;
        },
      };

      await cjsBundle.poku([DIR], {
        noExit: true,
        quiet: true,
        plugins: [captureCjs],
      });
      await esmBundle.poku([DIR], {
        noExit: true,
        quiet: true,
        plugins: [captureEsm],
      });

      assert.strictEqual(
        cjsContextResults,
        esmContextResults,
        'context.results from cjs.poku and esm.poku must be the same object'
      );
    });

    await it('ESM context.results must reflect tests run through CJS poku()', async () => {
      let delta: { passed: number; failed: number } | null = null;

      const proxyPlugin = {
        name: 'cjs-runner-from-esm',
        async setup(ctx: { results: { passed: number; failed: number } }) {
          const before = {
            passed: ctx.results.passed,
            failed: ctx.results.failed,
          };
          await cjsBundle.poku([DIR], {
            noExit: true,
            quiet: true,
            plugins: [],
          });
          delta = {
            passed: ctx.results.passed - before.passed,
            failed: ctx.results.failed - before.failed,
          };
        },
      };

      await esmBundle.poku([], {
        noExit: true,
        quiet: true,
        plugins: [proxyPlugin],
      });

      assert.ok(delta, 'plugin must have run');
      assert.deepStrictEqual(
        delta,
        { passed: 1, failed: 1 },
        'ESM context.results must reflect the run performed by cjs.poku()'
      );
    });
  } finally {
    await rm(DIR, { recursive: true, force: true });
  }
});
