import { ext, inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';

describe(async () => {
  await it('Before and After Each File', async () => {
    const output = await inspectPoku(`-d api.test.${ext}`, {
      cwd: 'test/__fixtures__/e2e/each-file',
    });

    if (output.exitCode !== 0) {
      console.log(output.stdout);
      console.log(output.stderr);
    }

    assert.strictEqual(output.exitCode, 0, 'Should Pass');

    assert.match(
      output.stdout,
      /● Before and After Each: direct methods/,
      'Before and After Each: direct methods'
    );

    assert.match(
      output.stdout,
      /● Before and After Each: called methods/,
      'Before and After Each: called methods'
    );

    assert.match(
      output.stdout,
      /● Before and After Each: await called methods/,
      'Before and After Each: await called methods'
    );

    assert.match(
      output.stdout,
      /● Before and After Each: Failure/,
      'Before and After Each: Failure'
    );
  });
});
