import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku, isBuild } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';
import { GLOBAL } from '../../src/configs/poku.js';

if (isBuild) skip();

describe('Test Runtimes/Platforms + Extensions', async () => {
  await it('.pokurc.jsonc', async () => {
    const output = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/config-files/jsonc-rc',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('.pokurc.json', async () => {
    const output = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/config-files/json-rc',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('Custom (JSON)', async () => {
    const output = await inspectPoku('--config=custom.json', {
      cwd: 'test/__fixtures__/e2e/config-files/custom-file',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  if (GLOBAL.runtime === 'deno') return;

  await it('poku.config.js', async () => {
    const output = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/config-files/poku-config-js',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('poku.config.cjs', async () => {
    const output = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/config-files/poku-config-cjs',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('Custom (JS)', async () => {
    const output = await inspectPoku('--config=custom.js', {
      cwd: 'test/__fixtures__/e2e/config-files/custom-js-file',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('Custom (CJS)', async () => {
    const output = await inspectPoku('--config=custom.cjs', {
      cwd: 'test/__fixtures__/e2e/config-files/custom-cjs-file',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('Missing (JS)', async () => {
    const output = await inspectPoku('--config=missing.js', {
      cwd: 'test/__fixtures__/e2e/config-files/custom-js-file',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(
      !/debug/.test(output.stdout),
      'CLI doesn\'t needs to pass able "debug"'
    );
  });

  await it('Wrong Props', async () => {
    if (GLOBAL.runtime === 'bun') return;

    const output = await inspectPoku('-x', {
      cwd: 'test/__fixtures__/e2e/config-files/wrong-props',
    });

    assert.strictEqual(output.exitCode, 1, 'Exit Code needs to be 1');
    assert(
      /debugs: unrecognized property in the config file./.test(output.stdout),
      'Needs to ensure unrecognized props'
    );
  });
});
