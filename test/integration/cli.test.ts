import process from 'node:process';
import { spawn } from 'node:child_process';
import { assert } from '../../src/index.js';
import { runner } from '../../src/helpers/runner.js';

// `/_.ts`: Simulate TypeScript file for Deno
const currentFile = typeof __filename === 'string' ? __filename : '/_.ts';
const runtimeOptions = runner(currentFile);
const originalRuntime = runtimeOptions.shift();
let runtime = originalRuntime!;
const ext = runtime === 'node' ? 'js' : 'ts';

const executeCLI = (args: string[]): Promise<string> =>
  new Promise((resolve, reject) => {
    let runtimeArguments =
      runtimeOptions.length > 1 ? [...runtimeOptions, ...args] : [...args];

    if (process.platform === 'win32' && originalRuntime === 'tsx') {
      runtime = 'npx.cmd';
      runtimeArguments = ['tsx', ...runtimeArguments];
    }

    const childProcess = spawn(runtime, runtimeArguments, {
      shell: false,
      cwd: process.cwd(),
    });

    let output: string = '';

    childProcess.stdout.on('data', (data: Buffer) => {
      output += data.toString();
    });

    childProcess.stderr.on('data', (data: Buffer) => {
      reject(data.toString());
    });

    childProcess.on('close', (code: number) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(`Process exited with code ${code}`);
      }
    });
  });

executeCLI([`./src/bin/index.${ext}`, `test/integration/code.test.${ext}`])
  .then((output) => {
    assert.match(JSON.stringify(output), /PASS › 1/, 'CLI needs to pass 1');
    assert.match(JSON.stringify(output), /FAIL › 0/, 'CLI needs to fail 0');
  })
  .catch((error) => {
    console.error('CLI test failed:', error);
  });
