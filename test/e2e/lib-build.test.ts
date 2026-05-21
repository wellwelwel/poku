import {
  LIB_ESM,
  skipUnlessBuilt,
} from '../__utils__/skip-unless-built.test.js';

skipUnlessBuilt();

const lib = (await import(
  LIB_ESM
)) as typeof import('../../src/modules/index.js');

const plugins = (await import(
  new URL('plugins.js', LIB_ESM).href
)) as typeof import('../../src/modules/plugins.js');

const { describe, it, assert } = lib;
const { inspectPoku } = plugins;

const BIN = 'lib/bin/index.js';

await describe('Built lib & bin against scoped fixtures', async () => {
  await it('CJS-only fixture passes via the built CJS bundle', async () => {
    const results = await inspectPoku({
      bin: BIN,
      command: '',
      spawnOptions: { cwd: 'test/__fixtures__/e2e/lib-build/cjs-only' },
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'cjs-only must exit 0');
  });

  await it('ESM-only fixture passes via the built ESM bundle', async () => {
    const results = await inspectPoku({
      bin: BIN,
      command: '',
      spawnOptions: { cwd: 'test/__fixtures__/e2e/lib-build/esm-only' },
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'esm-only must exit 0');
  });

  await it('Ambiguous fixture exercises both bundles via .cjs and .mjs', async () => {
    const results = await inspectPoku({
      bin: BIN,
      command: '',
      spawnOptions: { cwd: 'test/__fixtures__/e2e/lib-build/ambiguous' },
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'ambiguous must exit 0');
  });
});
