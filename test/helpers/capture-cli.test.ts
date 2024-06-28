import process from 'node:process';
import { spawn, type SpawnOptionsWithoutStdio } from 'node:child_process';
import { isWindows, runner } from '../../src/parsers/get-runner.js';

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

    let output = '';

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

export const inspectCLI = (
  command: string,
  options?: SpawnOptionsWithoutStdio
): Promise<{ stdout: string; stderr: string; exitCode: number }> =>
  new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');

    const childProcess = spawn(cmd, args, {
      shell: isWindows,
      ...options,
    });

    let stdout = '';
    let stderr = '';

    childProcess.stdout.on('data', (data: Buffer) => {
      stdout += data.toString();
    });

    childProcess.stderr.on('data', (data: Buffer) => {
      stderr += data.toString();
    });

    childProcess.on('error', (error: Error) => {
      reject({ error: error.message, stdout, stderr, exitCode: 1 });
    });

    childProcess.on('close', (code: number) => {
      resolve({ stdout, stderr, exitCode: code });
    });
  });
