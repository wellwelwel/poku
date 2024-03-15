import process from 'node:process';
import { assert, describe, test } from '../../src/index.js';
import { runTestFile } from '../../src/services/run-test-file.js';
import { getRuntime } from '../../src/helpers/get-runtime.js';

const isProduction = process.env.NODE_ENV === 'production';
const ext = getRuntime() === 'deno' ? 'ts' : isProduction ? 'js' : 'ts';

describe('Service: runTestFile', { background: false, icon: '🔬' });

test(async () => {
  const code = await runTestFile(`./fixtures/fail/exit.test.${ext}`, {
    quiet: true,
  });

  assert.deepStrictEqual(code, false, 'Failure test file case');
});

test(async () => {
  const code = await runTestFile(`./fixtures/success/exit.test.${ext}`, {
    quiet: true,
  });

  assert.deepStrictEqual(code, true, 'Success test file case');
});
