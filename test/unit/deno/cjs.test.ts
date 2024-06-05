import process from 'node:process';
import { spawn } from 'node:child_process';
import { getRuntime } from '../../../src/helpers/get-runtime.js';
import { describe } from '../../../src/modules/describe.js';
import { assert } from '../../../src/modules/assert.js';

const runtime = getRuntime();

if (runtime !== 'deno') process.exit(0);

describe('Deno Compatibility', { icon: '🦕' });

const FILE = './fixtures/deno/require.cjs';
const polyfillPath = './lib/polyfills/deno.mjs';

const command = 'deno';
const args = ['run', '--allow-env', '--allow-read', polyfillPath];
const env = { ...process.env, FILE };

const denoProcess = spawn(command, args, { env });

let output: string = '';

denoProcess.stdout.on('data', (data) => {
  output += String(data);
});

denoProcess.stderr.on('data', (data) => {
  output += String(data);
});

denoProcess.on('error', (err) => {
  console.log(err);
});

denoProcess.on('close', (code) => {
  assert.strictEqual(
    output.trim(),
    'Hello from module.exports\nHello from exports'.trim(),
    'Testing CJS polyfill'
  );

  if (code !== 0) process.exit(code);
});
