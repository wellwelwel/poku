import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku } from '../__utils__/capture-cli.test.js';

describe('CLI Flags', async () => {
  await it('Short flags', async () => {
    const output = await inspectPoku('-d -p', {
      cwd: 'test/__fixtures__/e2e/no-tests',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/debug:(.+)true/.test(output.stdout), 'CLI needs to able "debug"');
    assert(
      /parallel:(.+)true/.test(output.stdout),
      'CLI needs to able "parallel"'
    );
  });

  await it('Kebab flags', async () => {
    const output = await inspectPoku('--debug --fail-fast --deno-cjs=js,cjs', {
      cwd: 'test/__fixtures__/e2e/no-tests',
    });

    console.log(output.stdout);

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/debug:(.+)true/.test(output.stdout), 'CLI needs to able "debug"');
    assert(
      /failFast:(.+)true/.test(output.stdout),
      'CLI needs to able "failFast"'
    );
    assert(
      /cjs:(.+)js(.+)cjs/.test(output.stdout),
      'CLI needs to able "Deno CJS Pollyfill"'
    );
  });

  await it('Camel flags', async () => {
    const output = await inspectPoku('--debug --failFast --denoCjs=js,cjs', {
      cwd: 'test/__fixtures__/e2e/no-tests',
    });

    assert.strictEqual(output.exitCode, 0, 'Exit Code needs to be 0');
    assert(/debug:(.+)true/.test(output.stdout), 'CLI needs to able "debug"');
    assert(
      /failFast:(.+)true/.test(output.stdout),
      'CLI needs to able "failFast"'
    );
    assert(
      /cjs:(.+)js(.+)cjs/.test(output.stdout),
      'CLI needs to able "Deno CJS Pollyfill"'
    );
  });
});
