import { inspectPoku, stripAnsi } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';

describe('Test Name Pattern', async () => {
  await it('--testNamePattern', async () => {
    const results = await inspectPoku('--testNamePattern=Bun --debug', {
      cwd: 'test/__fixtures__/e2e/test-name-pattern',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');

    const output = stripAnsi(results.stdout);

    assert.match(output, /Bun: should pass/, 'Bun test ran');
    assert.doesNotMatch(output, /Node: should pass/, 'Node test skipped');
    assert.doesNotMatch(output, /Deno: should pass/, 'Deno test skipped');
  });

  await it('-t alias', async () => {
    const results = await inspectPoku('-t=Deno --debug', {
      cwd: 'test/__fixtures__/e2e/test-name-pattern',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');

    const output = stripAnsi(results.stdout);

    assert.match(output, /Deno: should pass/, 'Deno test ran');
    assert.doesNotMatch(output, /Node: should pass/, 'Node test skipped');
    assert.doesNotMatch(output, /Bun: should pass/, 'Bun test skipped');
  });

  await it('--testSkipPattern', async () => {
    const results = await inspectPoku('--testSkipPattern=Node --debug', {
      cwd: 'test/__fixtures__/e2e/test-name-pattern',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');

    const output = stripAnsi(results.stdout);

    assert.match(output, /Bun: should pass/, 'Bun test ran');
    assert.match(output, /Deno: should pass/, 'Deno test ran');
    assert.doesNotMatch(output, /Node: should pass/, 'Node test skipped');
  });

  await it('--testNamePattern matches literally', async () => {
    const results = await inspectPoku('--testNamePattern=should --debug', {
      cwd: 'test/__fixtures__/e2e/test-name-pattern',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Passed');

    const output = stripAnsi(results.stdout);

    assert.match(output, /Node: should pass/, 'Node test ran');
    assert.match(output, /Bun: should pass/, 'Bun test ran');
    assert.match(output, /Deno: should pass/, 'Deno test ran');
  });
});
