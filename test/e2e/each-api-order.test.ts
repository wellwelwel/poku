import { getRuntime } from '../../src/parsers/get-runtime.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { ext, inspectPoku } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (getRuntime() === 'deno') skip();

const output = [
  {
    run: () =>
      inspectPoku(`sync.test.${ext} -d`, {
        cwd: 'test/__fixtures__/e2e/each-api',
      }),
    testCase: 'Sync',
  },
  {
    run: () =>
      inspectPoku(`async.test.${ext} -d`, {
        cwd: 'test/__fixtures__/e2e/each-api',
      }),
    testCase: 'Async',
  },
  {
    run: () =>
      inspectPoku(`sync-with-async-tests.test.${ext} -d`, {
        cwd: 'test/__fixtures__/e2e/each-api',
      }),
    testCase: 'Sync Hooks with async Tests',
  },
];

describe('Testing ', async () => {
  for (const { run, testCase } of output) {
    await it(testCase, async () => {
      const results = await run();
      const actual = results.stdout.split('\n');
      const offset =
        actual.findIndex((line) => line.includes('◌ first test')) - 1;

      if (results.exitCode !== 0) {
        console.log(results.stdout);
        console.log(results.stderr);
      }

      assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
      assert.match(actual[offset + 1], /◌ first test/);
      assert.match(actual[offset + 2], /before beforeEach writeFixture/);
      assert.match(actual[offset + 3], /- Writing/);
      assert.match(actual[offset + 4], /- after beforeEach writeFixture/);
      assert.match(actual[offset + 5], /before first test/);
      assert.match(actual[offset + 6], /✔ first test/);
      assert.match(actual[offset + 7], /after first test/);
      assert.match(actual[offset + 8], /- before afterEach clearFixture/);
      assert.match(actual[offset + 9], /- Cleaning/);
      assert.match(actual[offset + 10], /- after afterEach clearFixture/);
      assert.match(actual[offset + 11], /● first test/);
      assert.match(actual[offset + 12], /◌ second test/);
      assert.match(actual[offset + 13], /- before beforeEach writeFixture/);
      assert.match(actual[offset + 14], /- Writing/);
      assert.match(actual[offset + 15], /- after beforeEach writeFixture/);
      assert.match(actual[offset + 16], /before second test/);
      assert.match(actual[offset + 17], /✔ second test/);
    });
  }
});
