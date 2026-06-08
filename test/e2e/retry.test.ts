import { ext, inspectPoku } from '../__utils__/capture-cli.test.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

describe('Retry', async () => {
  await it('Basic retry succeeds on third attempt', async () => {
    const results = await inspectPoku(`basic.test.${ext}`, {
      cwd: 'test/__fixtures__/e2e/retry',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Should pass');
    assert.match(
      results.stdout,
      /Retry succeeded/,
      'Should show retry success'
    );
    assert.match(
      results.stdout,
      /should have attempted 3 times/,
      'Should show final assertion'
    );
  });

  await it('Config object retry succeeds on second attempt', async () => {
    const results = await inspectPoku(`config-object.test.${ext}`, {
      cwd: 'test/__fixtures__/e2e/retry',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Should pass');
    assert.match(
      results.stdout,
      /Retry succeeded/,
      'Should show retry success'
    );
    assert.match(
      results.stdout,
      /should have attempted 2 times/,
      'Should show final assertion'
    );
  });

  await it('Delay between attempts is respected', async () => {
    const results = await inspectPoku(`delay.test.${ext}`, {
      cwd: 'test/__fixtures__/e2e/retry',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Should pass');
    assert.match(
      results.stdout,
      /should wait the configured delay between attempts/,
      'Should show final assertion'
    );
  });

  await it('Immediate success on first attempt', async () => {
    const results = await inspectPoku(`immediate-success.test.${ext}`, {
      cwd: 'test/__fixtures__/e2e/retry',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Should pass');
    assert.match(
      results.stdout,
      /should have attempted only once/,
      'Should show final assertion'
    );
  });

  await it('Nested retries succeed', async () => {
    const results = await inspectPoku(`nested.test.${ext}`, {
      cwd: 'test/__fixtures__/e2e/retry',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Should pass');
    assert.match(
      results.stdout,
      /should have correct attempt counts/,
      'Should show final assertion'
    );
  });

  await it('Retry around describe succeeds', async () => {
    const results = await inspectPoku(`around-describe.test.${ext}`, {
      cwd: 'test/__fixtures__/e2e/retry',
    });

    if (results.exitCode !== 0) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 0, 'Should pass');
    assert.match(
      results.stdout,
      /should have attempted 2 times/,
      'Should show final assertion'
    );
  });

  await it('Retry exhaustion fails', async () => {
    const results = await inspectPoku(`exhaustion.test.${ext}`, {
      cwd: 'test/__fixtures__/e2e/retry',
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Should fail');
    assert.match(
      results.stdout,
      /Should always fail/,
      'Should show assertion message'
    );
  });

  await it('Rethrows the last error when the callback throws', async () => {
    const results = await inspectPoku(`throws.test.${ext}`, {
      cwd: 'test/__fixtures__/e2e/retry',
    });

    if (results.exitCode !== 1) {
      console.log(results.stdout);
      console.log(results.stderr);
    }

    assert.strictEqual(results.exitCode, 1, 'Should fail');
    assert.match(
      results.stdout,
      /callback threw outside an assertion/,
      'Should surface the thrown error'
    );
  });
});
