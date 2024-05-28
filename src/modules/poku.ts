/* c8 ignore start */

/**
 * Both CLI, API, noExit, sequential and parallel runs are strictly tested, but these tests use deep child process for it
 */

import process, { stdout } from 'node:process';
import { EOL } from 'node:os';
import { Code } from '../@types/code.js';
import { Configs } from '../@types/poku.js';
import { forceArray } from '../helpers/force-array.js';
import { runTests, runTestsParallel } from '../services/run-tests.js';
import { exit } from './exit.js';
import { format } from '../helpers/format.js';
import { isQuiet } from '../helpers/logs.js';
import { hr } from '../helpers/hr.js';
import { fileResults } from '../configs/files.js';
import { indentation } from '../configs/indentation.js';

process.once('SIGINT', () => {
  stdout.write('\u001B[?25h');
});

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

  const prepareDirs = forceArray(targetPaths);
  const dirs = prepareDirs.length > 0 ? prepareDirs : ['./'];
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

    exit(code, configs?.quiet);
    return;
  }

  // Parallel
  if (showLogs) {
    hr();
    console.log(`${format.bold('Running the Test Suite in Parallel')}${EOL}`);
  }

  try {
    const promises = dirs.map(async (dir) => {
      const result = await runTestsParallel(dir, configs);

      if (!result && configs?.failFast) throw '';

      return result;
    });

    const concurrency = await Promise.all(promises);

    if (concurrency.some((result) => !result)) code = 1;
  } catch {}

  showLogs && hr();

  if (showLogs && fileResults.success.length > 0)
    console.log(
      fileResults.success
        .map(
          (current) =>
            `${indentation.test}${format.success('✔')} ${format.dim(current)}`
        )
        .join(EOL)
    );

  if (showLogs && fileResults.fail.length > 0)
    console.log(
      fileResults.fail
        .map((current) => `${indentation.test}${format.fail('✘')} ${current}`)
        .join(EOL)
    );

  if (configs?.noExit) return code;

  exit(code, configs?.quiet);
}

/* c8 ignore stop */
