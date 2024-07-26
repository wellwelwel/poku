import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectCLI, isProduction } from '../helpers/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isProduction) {
  skip();
}

describe('Fast Fast', async () => {
  await it('Parallel / Concurrent', async () => {
    const results = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: './fixtures/fail-fast/parallel',
    });

    assert.match(results.stderr, /fail-fast/, 'Fail Fast is enabled');
    assert.match(results.stdout, /FAIL › 1/, 'Needs to fail 1');
  });

  await it('Sequential', async () => {
    const results = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: './fixtures/fail-fast/sequential',
    });

    assert.match(results.stdout, /fail-fast/, 'Fail Fast is enabled');
    assert.match(results.stdout, /FAIL › 1/, 'Needs to fail 1');
  });
});
