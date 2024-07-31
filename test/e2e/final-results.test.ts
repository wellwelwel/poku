import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectCLI, isProduction } from '../helpers/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (isProduction) {
  skip();
}

describe('Final Results', async () => {
  await it('Skip', async () => {
    const results = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: './fixtures/final-results/skip',
    });

    assert.match(results.stdout, /PASS › 0/, 'Needs to pass 0');
    assert.match(results.stdout, /FAIL › 0/, 'Needs to fail 0');
    assert.match(results.stdout, /SKIP › 1/, 'Needs to skip 1');
  });

  await it('Todo', async () => {
    const results = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: './fixtures/final-results/todo',
    });

    assert.match(results.stdout, /PASS › 1/, 'Needs to pass 0');
    assert.match(results.stdout, /FAIL › 0/, 'Needs to fail 0');
    assert.match(results.stdout, /TODO › 1/, 'Needs to todo 1');
  });

  await it('Skip + Todo', async () => {
    const results = await inspectCLI('npx tsx ../../../src/bin/index.ts', {
      cwd: './fixtures/final-results/skip-and-todo',
    });

    assert.match(results.stdout, /PASS › 1/, 'Needs to pass 0');
    assert.match(results.stdout, /FAIL › 0/, 'Needs to fail 0');
    assert.match(results.stdout, /SKIP › 1/, 'Needs to todo 1');
    assert.match(results.stdout, /TODO › 1/, 'Needs to todo 1');
  });
});
