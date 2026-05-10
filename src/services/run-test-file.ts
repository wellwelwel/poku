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

export const runTestFile = async (
  path: string,
  attempt?: number,
  isFinalAttempt?: boolean
): Promise<boolean> => {
  const { configs } = GLOBAL;

  if (configs.isolation === 'none') {
    const { runTestInProcess } = await import('./run-test-in-process.js');
    return runTestInProcess(path, attempt, isFinalAttempt);
  }

  const { cwd, reporter } = GLOBAL;
  const runtimeOptions = runner(path);
  let command = [...runtimeOptions, path, ...deepOptions];

  const plugins = configs.plugins;
  if (plugins?.length) {
    for (const plugin of plugins)
      if (plugin.runner) {
        command = plugin.runner(command, path);
        break;
      }
  }

  const runtime = command.shift()!;
  const file = relative(cwd, path);
  const showLogs = !configs.quiet;
  const outputChunks: string[] = [];
  let outputSize = 0;

  const stdOut = (data: string): void => {
    if (outputSize < 10_485_760) {
      outputChunks.push(data);
      outputSize += data.length;
    }
  };

  const start = hrtime();
  let end: ReturnType<typeof hrtime>;

  if (!(await beforeEach(file))) return false;

  if (isFinalAttempt !== false) {
    reporter.onFileStart({
      path: {
        relative: file,
        absolute: path,
      },
    });
  }

  return new Promise((resolve) => {
    const child = spawn(runtime, command, {
      stdio: plugins?.some((plugin) => plugin.ipc) ? STDIO_IPC : STDIO_DEFAULT,
      shell: false,
    });

    child.stdout!.setEncoding('utf8');
    child.stderr!.setEncoding('utf8');
    child.stdout!.on('data', stdOut);
    child.stderr!.on('data', stdOut);

    if (plugins?.length) {
      for (const plugin of plugins)
        if (plugin.onTestProcess) plugin.onTestProcess(child, path);
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

      if (showLogs && isFinalAttempt !== false) {
        const output = outputChunks.join('');
        const parsedOutputs = parserOutput({
          output,
          result,
        })?.join('\n');

        const total = end[0] * 1e3 + end[1] / 1e6;

        reporter.onFileResult({
          status: result,
          path: {
            relative: file,
            absolute: path,
          },
          duration: total,
          output: parsedOutputs,
          retries: attempt && attempt > 0 ? attempt : undefined,
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

      if (isFinalAttempt !== false) {
        reporter.onFileResult({
          status: false,
          path: {
            relative: file,
            absolute: path,
          },
          duration: total,
          retries: attempt && attempt > 0 ? attempt : undefined,
        });
      }

      resolve(false);
    });
  });
};
