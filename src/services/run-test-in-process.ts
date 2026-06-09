import { relative } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { GLOBAL } from '../configs/poku.js';
import { timeoutMessage } from '../parsers/output.js';
import { afterEach, beforeEach } from './each.js';
import { reportFileResult } from './run-test-common.js';

const stdoutWrite = process.stdout.write.bind(process.stdout);

const cleanup = () => {
  process.stdout.write = stdoutWrite;
  process.exitCode = 0;
};

const mockProcess = (outputChunks: string[]) => {
  process.stdout.write = (
    chunk: string | Uint8Array,
    ..._args: unknown[]
  ): boolean => {
    outputChunks.push(String(chunk));
    return true;
  };
};

export const runTestInProcess = async (path: string): Promise<boolean> => {
  cleanup();

  const { cwd, configs, reporter } = GLOBAL;
  const file = relative(cwd, path);
  const showLogs = !configs.quiet;
  const outputChunks: string[] = [];
  const start = process.hrtime();

  if (!(await beforeEach(file))) return false;

  mockProcess(outputChunks);
  reporter.onFileStart({
    path: {
      relative: file,
      absolute: path,
    },
  });

  let timedOut = false;
  let killTimer: ReturnType<typeof setTimeout> | undefined;
  let result = true;

  try {
    const testPromise = import(`${pathToFileURL(path).href}?t=${Date.now()}`);

    if (configs.timeout) {
      const timeoutPromise = new Promise<never>((_, reject) => {
        killTimer = setTimeout(() => {
          timedOut = true;
          reject(
            new Error(`Timeout: test file exceeded ${configs.timeout}ms limit`)
          );
        }, configs.timeout);
      });

      await Promise.race([testPromise, timeoutPromise]);
    } else await testPromise;
  } catch {
    if (timedOut) outputChunks.push(timeoutMessage(configs.timeout!));

    result = false;
  } finally {
    if (process.exitCode !== 0) result = false;

    if (killTimer) clearTimeout(killTimer);
    cleanup();
  }

  const end = process.hrtime(start);

  if (showLogs)
    reportFileResult({
      reporter,
      file,
      path,
      outputChunks,
      result,
      end,
      debug: configs.debug,
    });

  if (!(await afterEach(file))) return false;

  return result;
};
