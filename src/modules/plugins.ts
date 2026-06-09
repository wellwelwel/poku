import type { SpawnOptionsWithoutStdio } from 'node:child_process';
import type { InspectCLIResult, PokuPlugin } from '../@types/plugin.js';
import { spawn } from 'node:child_process';
import { env } from 'node:process';
import { kill as pokuKill } from '../modules/helpers/kill.js';
import { runner } from '../parsers/get-runner.js';

export { createReporter } from '../builders/reporter.js';
export { findFileFromStack } from '../parsers/find-file-from-stack.js';
export { onSigint } from './essentials/poku.js';
export { reporter as reporterRegistry } from '../services/reporter.js';

export type {
  ReporterPlugin,
  ReporterEvents,
  PokuPlugin,
  PluginContext,
  InspectCLIResult,
  ScopeHook,
} from '../@types/plugin.js';

export const definePlugin = (plugin: PokuPlugin): PokuPlugin => plugin;

declare const require: ReturnType<typeof import('node:module').createRequire>;

const pokuBin: string = (() => {
  try {
    return require.resolve('../bin/index.js');
  } catch {
    return '';
  }
})();

export const inspectPoku = (options: {
  command: string;
  spawnOptions?: SpawnOptionsWithoutStdio;
  bin?: string;
}): Promise<InspectCLIResult> => {
  const { command, spawnOptions, bin = pokuBin } = options;
  const ext = bin.endsWith('.ts') ? 'ts' : 'js';
  const [runtime, ...runnerArgs] = runner(`_.${ext}`);
  const basePath =
    typeof spawnOptions?.cwd === 'string'
      ? spawnOptions.cwd
          .split(/\/|\\/)
          .map(() => '../')
          .join('')
      : './';

  const args = [...runnerArgs, `${basePath}${bin}`, ...command.split(' ')];

  return new Promise((resolve, reject) => {
    const childProcess = spawn(runtime, args, {
      ...spawnOptions,
      shell: false,
      env: {
        ...(spawnOptions?.env || env),
        POKU_RUNTIME: env.POKU_RUNTIME,
      },
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
};
