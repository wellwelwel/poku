import type {
  ChildProcessWithoutNullStreams,
  SpawnOptionsWithoutStdio,
} from 'node:child_process';
import type { InspectCLIResult } from '../../src/@types/plugin.js';
import { spawn } from 'node:child_process';
import process, { env } from 'node:process';
import { kill as pokuKill } from '../../src/modules/helpers/kill.js';
import { sleep } from '../../src/modules/helpers/wait-for.js';
import { inspectPoku as inspectPokuInner } from '../../src/modules/plugins.js';
import { runner } from '../../src/parsers/get-runner.js';
import { isWindows } from '../../src/parsers/os.js';

export const inspectCLI = (
  command: string,
  options?: SpawnOptionsWithoutStdio
): Promise<InspectCLIResult> =>
  new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');

    const childProcess = spawn(cmd, args, {
      ...options,
      shell: isWindows,
    });

    childProcess.stdout.setEncoding('utf8');
    childProcess.stderr.setEncoding('utf8');

    const PID = childProcess.pid!;

    const kill = async () => {
      await pokuKill.pid(PID);
    };

    let stdout = '';
    let stderr = '';

    childProcess.stdout.on('data', (data: Buffer) => {
      stdout += String(data);
    });

    childProcess.stderr.on('data', (data: Buffer) => {
      stderr += String(data);
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

export const isBuild = process.env.NODE_ENV === 'build';

export const ext = isBuild ? 'js' : 'ts';

export const stripAnsi = (str: string) => str.replace(/\x1B\[[0-9;]*m/g, '');

type WatchCLIResult = {
  process: ChildProcessWithoutNullStreams;
  PID: number;
  kill: () => Promise<void>;
  getOutput: () => {
    stdout: string;
    stderr: string;
  };
};

export const inspectPoku = (
  command: string,
  options?: SpawnOptionsWithoutStdio
) =>
  inspectPokuInner({
    bin: `src/bin/index.${ext}`,
    command,
    spawnOptions: options,
  });

export const watchCLI = (
  command: string,
  options?: SpawnOptionsWithoutStdio
): WatchCLIResult => {
  const cmd = runner(`_.${ext}`);
  console.log(cmd);
  const binFile = `src/bin/index.${ext}`;
  const basePath =
    typeof options?.cwd === 'string'
      ? options.cwd
          .split(/\/|\\/)
          .map(() => '../')
          .join('')
      : './';
  const runtime = cmd.shift()!;
  const args = [
    ...cmd,
    `${basePath}${binFile}`,
    '--watch',
    ...command.split(' '),
  ];

  const childProcess = spawn(runtime, args, {
    ...options,
    shell: isWindows,
    env: {
      ...(options?.env || env),
      POKU_RUNTIME: env.POKU_RUNTIME,
    },
  });

  childProcess.stdout.setEncoding('utf8');
  childProcess.stderr.setEncoding('utf8');

  let stdout = '';
  let stderr = '';

  const PID = childProcess.pid!;

  const kill = async () => {
    const closed = new Promise<void>((resolve) => {
      childProcess.on('close', () => resolve());
    });

    childProcess.kill('SIGTERM');

    const timeout = sleep(1000).then(() => 'timeout' as const);
    const result = await Promise.race([closed, timeout]);

    if (result === 'timeout') await pokuKill.pid(PID);
  };

  const getOutput = () => {
    return {
      stdout,
      stderr,
    };
  };

  childProcess.stdout.on('data', (data: Buffer) => {
    stdout += String(data);
  });

  childProcess.stderr.on('data', (data: Buffer) => {
    stderr += String(data);
  });

  childProcess.on('error', (error: Error) => {
    throw error;
  });

  return { kill, PID, process: childProcess, getOutput };
};
