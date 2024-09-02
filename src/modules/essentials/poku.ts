import type { Code } from '../../@types/code.js';
import type { Configs } from '../../@types/poku.js';
import process from 'node:process';
import { runTests, runTestsParallel } from '../../services/run-tests.js';
import { Write } from '../../services/write.js';
import { exit } from '../helpers/exit.js';
import { format, showTestResults } from '../../services/format.js';
import { isQuiet } from '../../parsers/output.js';
import { finalResults } from '../../configs/files.js';

/* c8 ignore start */ // Process-based
export const onSigint = () => process.stdout.write('\u001B[?25h');

process.once('SIGINT', onSigint);
/* c8 ignore stop */

export async function poku(
  targetPaths: string | string[],
  configs: Configs & { noExit: true }
): Promise<Code>;
export async function poku(
  targetPaths: string | string[],
  configs?: Configs
): Promise<undefined>;
export async function poku(
  targetPaths: string | string[],
  configs?: Configs
): Promise<Code | undefined> {
  let code: Code = 0;

  finalResults.started = new Date();

  const start = process.hrtime();
  const dirs = Array.prototype.concat(targetPaths);
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

    showLogs && showTestResults();

    exit(code, configs?.quiet);
    return;
  }

  // Parallel
  if (showLogs) {
    Write.hr();
    Write.log(`${format('Running the Test Suite in Parallel').bold()}\n`);
  }

  try {
    const promises = dirs.map(async (dir) => {
      const result = await runTestsParallel(dir, configs);
      if (!result && configs?.failFast) throw new Error('quiet');

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

  showLogs && showTestResults();

  if (configs?.noExit) return code;

  exit(code, configs?.quiet);
}
