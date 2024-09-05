import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { nodeVersion } from '../../src/parsers/get-runtime.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (nodeVersion && nodeVersion < 12) {
  skip();
}

describe('Final Results', async () => {
  await it('Skip', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/final-results/skip',
    });

    assert.match(results.stdout, /PASS › 0/, 'Needs to pass 0');
    assert.match(results.stdout, /FAIL › 0/, 'Needs to fail 0');
    assert.match(results.stdout, /SKIP › 1/, 'Needs to skip 1');
  });

  await it('Skip (it)', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/final-results/skip-it',
    });

    assert.match(results.stdout, /PASS › 0/, 'Needs to pass 0');
    assert.match(results.stdout, /FAIL › 0/, 'Needs to fail 0');
    assert.match(results.stdout, /SKIP › 1/, 'Needs to skip 1');
  });

  await it('Skip (describe)', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/final-results/skip-describe',
    });

    assert.match(results.stdout, /PASS › 0/, 'Needs to pass 0');
    assert.match(results.stdout, /FAIL › 0/, 'Needs to fail 0');
    assert.match(results.stdout, /SKIP › 1/, 'Needs to skip 1');
  });

  await it('Skip (describe + it)', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/final-results/skip-describe-it',
    });

    assert.match(results.stdout, /PASS › 0/, 'Needs to pass 0');
    assert.match(results.stdout, /FAIL › 0/, 'Needs to fail 0');
    assert.match(results.stdout, /SKIP › 1/, 'Needs to skip 1');
  });

  await it('Todo', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/final-results/todo',
    });

    assert.match(results.stdout, /PASS › 1/, 'Needs to pass 1');
    assert.match(results.stdout, /FAIL › 0/, 'Needs to fail 0');
    assert.match(results.stdout, /TODO › 1/, 'Needs to todo 1');
  });

  await it('Skip + Todo', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/final-results/skip-and-todo',
    });

    assert.match(results.stdout, /PASS › 1/, 'Needs to pass 1');
    assert.match(results.stdout, /FAIL › 0/, 'Needs to fail 0');
    assert.match(results.stdout, /SKIP › 1/, 'Needs to todo 1');
    assert.match(results.stdout, /TODO › 1/, 'Needs to todo 1');
  });

  await it('Skip + Todo + Failure', async () => {
    const results = await inspectPoku('', {
      cwd: 'test/__fixtures__/e2e/final-results/skip-todo-and-failure',
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.match(results.stdout, /PASS › 1/, 'Needs to pass 1');
    assert.match(results.stdout, /FAIL › 1/, 'Needs to fail 1');
    assert.match(results.stdout, /SKIP › 1/, 'Needs to todo 1');
    assert.match(results.stdout, /TODO › 1/, 'Needs to todo 1');
  });
});
