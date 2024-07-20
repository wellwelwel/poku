import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectCLI, isProduction } from '../helpers/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isProduction) {
  skip();
}

describe('Test Runtimes/Platforms + Extensions', async () => {
  await it('JSONC', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/jsonc',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('JSONC (no extension)', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/jsonc-no-ext',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('JSONC (RC)', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/jsonc-rc',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('JSON', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/json',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('JSON (no extension)', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/json-no-ext',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('JSON (RC)', async () => {
    const output = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: 'fixtures/config-files/json-rc',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/PASS › 1/.test(output.stdout), 'CLI needs to pass 1');
    assert(/debug/.test(output.stdout), 'CLI needs to pass able "debug"');
  });

  await it('Custom', async () => {
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
});
