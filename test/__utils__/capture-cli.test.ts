import process, { env } from 'node:process';
import {
  type ChildProcessWithoutNullStreams,
  spawn,
  type SpawnOptionsWithoutStdio,
} from 'node:child_process';
import { runner } from '../../src/parsers/get-runner.js';
import { kill as pokuKill } from '../../src/modules/helpers/kill.js';
import { isWindows } from '../../src/parsers/os.js';
import { GLOBAL } from '../../src/configs/poku.js';

export const isBuild = process.env.NODE_ENV === 'build';

export const ext = isBuild ? 'js' : 'ts';

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

export const inspectPoku = (
  command: string,
  options?: SpawnOptionsWithoutStdio
): Promise<InspectCLIResult> => {
  const cmd = runner(`_.${ext}`).join(' ');
  const binFile = `src/bin/index.${ext}`;
  const basePath =
    typeof options?.cwd === 'string'
      ? options.cwd
          .split(/\/|\\/)
          .map(() => '../')
          .join('')
      : './';

  return inspectCLI(`${cmd} ${basePath}${binFile} ${command}`, {
    shell: isWindows,
    ...options,
    env: {
      ...(options?.env || env),
      POKU_RUNTIME: env.POKU_RUNTIME,
    },
  });
};

export const watchCLI = (
  command: string,
  options?: SpawnOptionsWithoutStdio
): WatchCLIResult => {
  const { runtime } = GLOBAL;
  const binFile = 'src/bin/index.ts';
  const basePath =
    typeof options?.cwd === 'string'
      ? options.cwd
          .split(/\/|\\/)
          .map(() => '../')
          .join('')
      : './';

  const [cmd, ...args] =
    `${runtime === 'node' ? 'node -r tsx/cjs' : runner(`_.${ext}`).join(' ')} ${basePath}${binFile} --watch ${command}`.split(
      ' '
    );

  const childProcess = spawn(cmd, args, {
    shell: isWindows,
    ...options,
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
    await pokuKill.pid(PID);
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
