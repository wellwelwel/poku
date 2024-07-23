/* c8 ignore next 2 */ // Types
import type { Code } from '../../@types/code.js';
import type { Configs } from '../../@types/poku.js';
import process from 'node:process';
import { runTests, runTestsParallel } from '../../services/run-tests.js';
import { Write } from '../../services/write.js';
import { exit } from '../helpers/exit.js';
import { format } from '../../services/format.js';
import { isQuiet } from '../../parsers/output.js';
import { fileResults, finalResults } from '../../configs/files.js';
import { indentation } from '../../configs/indentation.js';

/* c8 ignore next 3 */
export const onSigint = () => {
  process.stdout.write('\u001B[?25h');
};

/* c8 ignore next */
process.once('SIGINT', onSigint);

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
  const prepareDirs = Array.prototype.concat(targetPaths);
  const dirs = prepareDirs.length > 0 ? prepareDirs : ['.'];
  const showLogs = !isQuiet(configs);

  // Sequential
  if (!configs?.parallel) {
    for (const dir of dirs) {
      const result = await runTests(dir, configs);

      if (!result) {
        code = 1;
        if (configs?.failFast) {
          break;
        }
      }
    }

    if (configs?.noExit) {
      return code;
    }

    const end = process.hrtime(start);
    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    finalResults.time = total;

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

      if (!result && configs?.failFast) {
        throw new Error('quiet');
      }

      return result;
    });

    const concurrency = await Promise.all(promises);

    if (concurrency.some((result) => !result)) {
      code = 1;
    }
  } catch {
  } finally {
    const end = process.hrtime(start);
    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    finalResults.time = total;
  }

  showLogs && Write.hr();

  if (showLogs && fileResults.success.size > 0) {
    Write.log(
      Array.from(fileResults.success)
        .map(
          ([file, time]) =>
            `${indentation.test}${format('✔').success()} ${format(`${file} ${format(`› ${time}ms`).success()}`).dim()}`
        )
        .join('\n')
    );
  }

  if (showLogs && fileResults.fail.size > 0) {
    Write.log(
      Array.from(fileResults.fail)
        .map(
          ([file, time]) =>
            `${indentation.test}${format('✘').fail()} ${format(`${file} ${format(`› ${time}ms`).fail()}`).dim()}`
        )
        .join('\n')
    );
  }

  if (configs?.noExit) {
    return code;
  }

  exit(code, configs?.quiet);
}
