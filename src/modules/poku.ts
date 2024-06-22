/* c8 ignore start */
/**
 * Both CLI, API, noExit, sequential and parallel runs are strictly tested, but these tests use deep child process for it
 */

import process from 'node:process';
import { runTests, runTestsParallel } from '../services/run-tests.js';
import { exit } from './exit.js';
import { format } from '../helpers/format.js';
import { isQuiet, write } from '../helpers/logs.js';
import { hr } from '../helpers/hr.js';
import { fileResults, finalResults } from '../configs/files.js';
import { indentation } from '../configs/indentation.js';
import type { Code } from '../@types/code.js';
import type { Configs } from '../@types/poku.js';

export const onSigint = () => {
  process.stdout.write('\u001B[?25h');
};

process.once('SIGINT', onSigint);

export async function poku(
  targetPaths: string | string[],
  configs: Configs & { noExit: true }
): Promise<Code>;
export async function poku(
  targetPaths: string | string[],
  configs?: Configs
): Promise<void>;
export async function poku(
  targetPaths: string | string[],
  configs?: Configs
): Promise<Code | void> {
  let code: Code = 0;

  finalResults.started = new Date();

  const start = process.hrtime();
  const prepareDirs = Array.prototype.concat(targetPaths);
  const dirs = prepareDirs.length > 0 ? prepareDirs : ['.'];
  const showLogs = !isQuiet(configs);

  // Sequential
  if (!configs?.parallel) {
    for (const dir of dirs) {
      const result = await runTests(dir, configs);

      if (!result) {
        code = 1;
        if (configs?.failFast) break;
      }
    }

    if (configs?.noExit) return code;

    const end = process.hrtime(start);
    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    finalResults.time = total;

    exit(code, configs?.quiet);
    return;
  }

  // Parallel
  if (showLogs) {
    hr();
    write(`${format.bold('Running the Test Suite in Parallel')}\n`);
  }

  try {
    const promises = dirs.map(async (dir) => {
      const result = await runTestsParallel(dir, configs);

      if (!result && configs?.failFast) throw '';

      return result;
    });

    const concurrency = await Promise.all(promises);

    if (concurrency.some((result) => !result)) code = 1;
  } catch {
  } finally {
    const end = process.hrtime(start);
    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    finalResults.time = total;
  }

  showLogs && hr();

  if (showLogs && fileResults.success.size > 0) {
    write(
      Array.from(fileResults.success)
        .map(
          ([file, time]) =>
            `${indentation.test}${format.success('✔')} ${format.dim(`${file} › ${time}ms`)}`
        )
        .join('\n')
    );
  }

  if (showLogs && fileResults.fail.size > 0) {
    write(
      Array.from(fileResults.fail)
        .map(
          ([file, time]) =>
            `${indentation.test}${format.fail('✘')} ${format.dim(`${file} › ${time}ms`)}`
        )
        .join('\n')
    );
  }

  if (configs?.noExit) return code;

  exit(code, configs?.quiet);
}
/* c8 ignore stop */
