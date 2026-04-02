import type { StdioOptions } from 'node:child_process';
import { spawn } from 'node:child_process';
import { relative } from 'node:path';
import { hrtime } from 'node:process';
import { deepOptions, GLOBAL } from '../configs/poku.js';
import { runner } from '../parsers/get-runner.js';
import { parserOutput } from '../parsers/output.js';
import { afterEach, beforeEach } from './each.js';
import { format } from './format.js';

const STDIO_IPC: StdioOptions = ['inherit', 'pipe', 'pipe', 'ipc'];
const STDIO_DEFAULT: StdioOptions = ['inherit', 'pipe', 'pipe'];

let cachedRunTestInProcess:
  | typeof import('./run-test-in-process.js')
  | undefined;

let cachedPluginRunner:
  | ((command: string[], path: string) => string[])
  | null
  | undefined;
let cachedHasIPC: boolean | undefined;
let cachedProcessPlugins:
  | {
      onTestProcess: NonNullable<
        NonNullable<typeof GLOBAL.configs.plugins>[number]['onTestProcess']
      >;
    }[]
  | undefined;

const resolvePluginCache = () => {
  const plugins = GLOBAL.configs.plugins;
  if (cachedPluginRunner !== undefined) return;
  if (!plugins?.length) {
    cachedPluginRunner = null;
    cachedHasIPC = false;
    cachedProcessPlugins = undefined;
    return;
  }
  cachedPluginRunner = plugins.find((p) => p.runner)?.runner ?? null;
  cachedHasIPC = plugins.some((p) => p.ipc);
  const pp = plugins.filter((p) => p.onTestProcess);
  cachedProcessPlugins =
    pp.length > 0 ? (pp as typeof cachedProcessPlugins) : undefined;
};

export const runTestFile = async (path: string): Promise<boolean> => {
  const { configs } = GLOBAL;

  if (configs.isolation === 'none') {
    cachedRunTestInProcess ??= await import('./run-test-in-process.js');
    return cachedRunTestInProcess.runTestInProcess(path);
  }

  resolvePluginCache();

  const { cwd, reporter } = GLOBAL;
  const runtimeOptions = runner(path);
  let command = runtimeOptions.concat(path, deepOptions);

  if (cachedPluginRunner) {
    command = cachedPluginRunner(command, path);
  }

  const runtime = command.shift()!;
  const file = relative(cwd, path);
  const showLogs = !configs.quiet;
  const outputChunks: string[] = [];

  const stdOut = (data: string): void => {
    outputChunks.push(data);
  };

  const start = hrtime();
  let end: ReturnType<typeof hrtime>;

  if (!(await beforeEach(file))) return false;

  reporter.onFileStart({
    path: {
      relative: file,
      absolute: path,
    },
  });

  return new Promise((resolve) => {
    const child = spawn(runtime, command, {
      stdio: cachedHasIPC ? STDIO_IPC : STDIO_DEFAULT,
      shell: false,
    });

    child.stdout!.setEncoding('utf8');
    child.stderr!.setEncoding('utf8');
    child.stdout!.on('data', stdOut);
    child.stderr!.on('data', stdOut);

    if (cachedProcessPlugins) {
      for (const plugin of cachedProcessPlugins)
        plugin.onTestProcess(child, path);
    }

    let timedOut = false;
    let killTimer: ReturnType<typeof setTimeout> | undefined;

    if (configs.timeout) {
      killTimer = setTimeout(() => {
        timedOut = true;
        outputChunks.push(
          `${format(`● Timeout: test file exceeded ${configs.timeout}ms limit`).fail().bold()}`
        );

        setTimeout(() => child.kill('SIGTERM'), 250);
      }, configs.timeout);
    }

    child.on('close', async (code) => {
      if (killTimer) clearTimeout(killTimer);

      end = hrtime(start);

      const result = timedOut ? false : code === 0;

      if (showLogs) {
        const output =
          outputChunks.length === 1 ? outputChunks[0] : outputChunks.join('');
        const total = end[0] * 1e3 + end[1] / 1e6;
        const parsedOutputs = parserOutput({ output, result })?.join('\n');

        reporter.onFileResult({
          status: result,
          path: {
            relative: file,
            absolute: path,
          },
          duration: total,
          output: parsedOutputs,
        });
      }

      if (!(await afterEach(file))) {
        resolve(false);
        return;
      }

      resolve(result);
    });

    child.on('error', (err) => {
      if (killTimer) clearTimeout(killTimer);

      end = hrtime(start);

      const total = end[0] * 1e3 + end[1] / 1e6;

      if (showLogs) console.error(`Failed to start test: ${path}`, err);

      reporter.onFileResult({
        status: false,
        path: {
          relative: file,
          absolute: path,
        },
        duration: total,
      });

      resolve(false);
    });
  });
};
