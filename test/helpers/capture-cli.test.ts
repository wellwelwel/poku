import process from 'node:process';
import {
  type ChildProcessWithoutNullStreams,
  spawn,
  type SpawnOptionsWithoutStdio,
} from 'node:child_process';
import { isWindows, runner } from '../../src/parsers/get-runner.js';
import { kill as pokuKill } from '../../src/modules/helpers/kill.js';

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

type InspectCLIResult = {
  stdout: string;
  stderr: string;
  exitCode: number;
  process: ChildProcessWithoutNullStreams;
  PID: number;
  kill: () => Promise<void>;
};

type WatchCLIResult = {
  process: ChildProcessWithoutNullStreams;
  PID: number;
  kill: () => Promise<void>;
  getOutput: () => {
    stdout: string;
    stderr: string;
  };
};

export const inspectCLI = (
  command: string,
  options?: SpawnOptionsWithoutStdio
): Promise<InspectCLIResult> =>
  new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');

    const childProcess = spawn(cmd, args, {
      shell: isWindows,
      ...options,
    });

    const PID = childProcess.pid!;

    const kill = async () => {
      await pokuKill.pid(PID);
    };

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
      resolve({
        stdout,
        stderr,
        exitCode: code,
        process: childProcess,
        PID,
        kill,
      });
    });
  });

export const watchCLI = (
  command: string,
  options?: SpawnOptionsWithoutStdio
): WatchCLIResult => {
  const [cmd, ...args] = command.split(' ');

  let stdout = '';
  let stderr = '';

  const childProcess = spawn(cmd, args, {
    shell: isWindows,
    ...options,
  });

  const PID = childProcess.pid!;

  const kill = async () => {
    await pokuKill.pid(PID);
  };

  const getOutput = () => {
    return {
      stdout,
      stderr,
    };
  };

  childProcess.stdout.on('data', (data: Buffer) => {
    stdout += data.toString();
  });

  childProcess.stderr.on('data', (data: Buffer) => {
    stderr += data.toString();
  });

  childProcess.on('error', (error: Error) => {
    throw error;
  });

  return { kill, PID, process: childProcess, getOutput };
};
