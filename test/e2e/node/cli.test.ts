import { spawn } from 'node:child_process';
import { assert, describe, test } from '../../../src/index.js';
import { runner } from '../../../src/helpers/runner.js';

// `/_.ts`: Simulate TypeScript file for Deno
const currentFile = typeof __filename === 'string' ? __filename : '/_.ts';
const runtimeOptions = runner(currentFile);
const runtime = runtimeOptions.shift()!;
const ext = runtime === 'node' ? 'js' : 'ts';

const executeCLI = (args: string[]): Promise<string> =>
  new Promise((resolve, reject) => {
    const runtimeArguments = [...runtimeOptions, ...args];

    const childProcess = spawn(runtime, runtimeArguments, {
      shell: false,
    });

    let output: string = '';

    childProcess.stdout.on('data', (data: Buffer) => {
      output += data.toString();
    });

    childProcess.stderr.on('data', (data: Buffer) => {
      reject(data.toString());
    });

    childProcess.on('error', (error: Buffer) => {
      reject(error.toString());
    });

    childProcess.on('close', (code: number) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(`Process exited with code ${code}`);
      }
    });
  });

test(async () => {
  describe('Poku Test Runner: CLI', { background: false, icon: '🐷' });

  const output = await executeCLI([
    `./src/bin/index.${ext}`,
    `test/integration/code.test.${ext}`,
  ]);

  assert(/PASS › 1/.test(JSON.stringify(output)), 'CLI needs to pass 1');
  assert(/FAIL › 0/.test(JSON.stringify(output)), 'CLI needs to fail 0');
});
