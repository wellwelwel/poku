import { relative } from 'node:path';
import { hrtime } from 'node:process';
import { pathToFileURL } from 'node:url';
import { GLOBAL } from '../configs/poku.js';
import { parserOutput } from '../parsers/output.js';
import { afterEach, beforeEach } from './each.js';
import { format } from './format.js';

export const runTestInProcess = async (path: string): Promise<boolean> => {
  const { cwd, configs, reporter } = GLOBAL;
  const file = relative(cwd, path);
  const showLogs = !configs.quiet;
  const outputChunks: string[] = [];

  const start = hrtime();

  if (!(await beforeEach(file))) return false;

  reporter.onFileStart({
    path: {
      relative: file,
      absolute: path,
    },
  });

  const savedExitCode = process.exitCode ?? 0;
  process.exitCode = 0;

  const originalStdoutWrite = process.stdout.write.bind(process.stdout);
  const originalStderrWrite = process.stderr.write.bind(process.stderr);

  process.stdout.write = (
    chunk: string | Uint8Array,
    ..._args: unknown[]
  ): boolean => {
    outputChunks.push(String(chunk));
    return true;
  };

  process.stderr.write = (
    chunk: string | Uint8Array,
    ..._args: unknown[]
  ): boolean => {
    outputChunks.push(String(chunk));
    return true;
  };

  let timedOut = false;
  let killTimer: ReturnType<typeof setTimeout> | undefined;
  let result = true;

  try {
    const testPromise = import(pathToFileURL(path).href);

    if (configs.timeout) {
      const timeoutPromise = new Promise<never>((_, reject) => {
        killTimer = setTimeout(() => {
          timedOut = true;
          reject(new Error(`Timeout: test file exceeded ${configs.timeout}ms limit`));
        }, configs.timeout);
      });

      await Promise.race([testPromise, timeoutPromise]);
    } else {
      await testPromise;
    }
  } catch (error) {
    if (timedOut) {
      outputChunks.push(
        `${format(`● Timeout: test file exceeded ${configs.timeout}ms limit`).fail().bold()}`
      );
    }

    result = false;
  } finally {
    if (killTimer) clearTimeout(killTimer);

    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
  }

  if (process.exitCode === 1) result = false;
  process.exitCode = savedExitCode;

  const end = hrtime(start);

  if (showLogs) {
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
    });
  }

  if (!(await afterEach(file))) return false;

  return result;
};
