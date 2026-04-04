import { relative } from 'node:path';
import { hrtime } from 'node:process';
import { GLOBAL } from '../configs/poku.js';
import { parserOutput } from '../parsers/output.js';
import { afterEach, beforeEach } from './each.js';
import { format } from './format.js';
import { getPool } from './worker-pool.js';

export const runTestInWorker = async (path: string): Promise<boolean> => {
  const pool = getPool();
  if (!pool) return false;

  const { cwd, configs, reporter } = GLOBAL;
  const file = relative(cwd, path);
  const showLogs = !configs.quiet;

  const start = hrtime();

  if (!(await beforeEach(file))) return false;

  reporter.onFileStart({
    path: {
      relative: file,
      absolute: path,
    },
  });

  const { exitCode, output, timedOut } = await pool.run(path, configs.timeout);

  const end = hrtime(start);
  const success = timedOut ? false : exitCode === 0;

  if (showLogs) {
    const total = end[0] * 1e3 + end[1] / 1e6;

    const fullOutput = timedOut
      ? `${output}${format(`● Timeout: test file exceeded ${configs.timeout}ms limit`).fail().bold()}`
      : output;

    const parsedOutputs = parserOutput({
      output: fullOutput,
      result: success,
    })?.join('\n');

    reporter.onFileResult({
      status: success,
      path: {
        relative: file,
        absolute: path,
      },
      duration: total,
      output: parsedOutputs,
    });
  }

  if (!(await afterEach(file))) return false;

  return success;
};
