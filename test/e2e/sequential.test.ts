import { getRuntime } from '../../src/parsers/get-runtime.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { inspectPoku } from '../__utils__/capture-cli.test.js';
import { skip } from '../../src/modules/helpers/skip.js';

if (getRuntime() === 'deno') skip();

const runtime = getRuntime();
const offset = runtime === 'bun' ? 36 : 32;

describe('Ensure sequential runs', async () => {
  const results = await inspectPoku('--debug --sequential', {
    cwd: 'test/__fixtures__/e2e/sequential',
  });

  const actual = results.stdout.split('\n');

  if (results.exitCode !== 0) {
    console.log(results.stdout);
    console.log(results.stderr);
  }

  assert.strictEqual(results.exitCode, 0, 'Exit Code needs to be 0');
  assert.match(actual[offset + 1], /1/);
  assert.match(actual[offset + 2], /2/);
  assert.match(actual[offset + 3], /3/);
  assert.match(actual[offset + 4], /4/);
  assert.match(actual[offset + 5], /5/);
});
