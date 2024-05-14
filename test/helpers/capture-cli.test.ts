import process from 'node:process';
import { spawn } from 'node:child_process';
import { isWindows, runner } from '../../src/helpers/runner.js';

// `/_.ts`: Simulate TypeScript file for Deno
const currentFile = typeof __filename === 'string' ? __filename : '/_.ts';
const runtimeOptions = runner(currentFile);
const runtime = runtimeOptions.shift()!;

export const isProduction = process.env.NODE_ENV === 'production';

export const ext = ['bun', 'node'].includes(runtime) ? 'js' : 'ts';

export const executeCLI = (args: string[]): Promise<string> =>
  new Promise((resolve, reject) => {
    const runtimeArguments = [...runtimeOptions, ...args];

    const childProcess = spawn(runtime, runtimeArguments, {
      shell: isWindows,
    });

    let output: string = '';

    childProcess.stdout.on('data', (data: Buffer) => {
      output += data.toString();
    });

    childProcess.stderr.on('data', (data: Buffer) => {
      reject(JSON.stringify(data.toString()));
    });

    childProcess.on('error', (error: Buffer) => {
      reject(JSON.stringify(error.toString()));
    });

    childProcess.on('close', (code: number) => {
      if (code === 0) {
        resolve(JSON.stringify(output));
      } else {
        console.log(output);
        reject(`Process exited with code ${code}`);
      }
    });
  });
