import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectCLI, isProduction } from '../helpers/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isProduction) {
  skip();
}

describe('Test Runtimes/Platforms + Extensions', async () => {
  await it('poku.jsonc', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/jsonc',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('.pokurc (JSONC)', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/jsonc-no-ext',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('.pokurc.jsonc', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/jsonc-rc',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('poku.json', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/json',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('.pokurc (JSON)', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/json-no-ext',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('.pokurc.json', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/json-rc',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('Custom (JSON)', async () => {
    const output = await inspectCLI(
      'npx tsx ../../../src/bin/index.ts --config=custom.json',
      {
        cwd: 'fixtures/config-files/custom-file',
      }
    );

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('poku.js', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/poku-js',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('poku.cjs', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/poku-cjs',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('poku.config.js', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/poku-config-js',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('poku.config.cjs', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/poku-config-cjs',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('.pokurc.js', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/poku-rc-js',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('.pokurc.cjs', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/poku-rc-cjs',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('Custom (JS)', async () => {
    const output = await inspectCLI(
      'npx tsx ../../../src/bin/index.ts --config=custom.js',
      {
        cwd: 'fixtures/config-files/custom-js-file',
      }
    );

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });
});
