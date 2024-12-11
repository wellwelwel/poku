import process from 'node:process';
import { spawn } from 'node:child_process';
import { test } from '../../../src/modules/helpers/test.js';
import { assert } from '../../../src/modules/essentials/assert.js';
import { skip } from '../../../src/modules/helpers/skip.js';
import { getRuntime } from '../../../src/parsers/get-runtime.js';

const runtime = getRuntime();

if (runtime !== 'deno') {
  skip('Skipping for non-Deno platforms');
}

test('Deno Compatibility', async () => {
  const POKU_FILE = 'test/__fixtures__/integration/deno/require.cjs';
  const polyfillPath = './lib/polyfills/deno.mjs';

  const command = 'deno';
  const args = ['run', '--allow-env', '--allow-read', polyfillPath];
  const env = { ...process.env, POKU_FILE };

  const denoProcess = spawn(command, args, { env });

  let output = '';

  denoProcess.stdout.on('data', (data) => {
    output += String(data);
  });

  denoProcess.stderr.on('data', (data) => {
    output += String(data);
  });

  denoProcess.on('error', (err) => {
    assert.ifError(err);
  });

  const code = await new Promise((resolve) =>
    denoProcess.on('close', (code) => {
      assert.strictEqual(
        output.trim(),
        'Hello from module.exports\nHello from exports'.trim(),
        'Testing CJS polyfill'
      );

      resolve(code);
    })
  );

  assert.strictEqual(code, 0, 'Expect for success');
});
