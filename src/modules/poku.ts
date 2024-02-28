import { EOL } from 'node:os';
import { Code } from '../@types/code.js';
import { Configs } from '../@types/poku.js';
import { forceArray } from '../helpers/force-array.js';
import { runTests, runTestsParallel } from '../services/run-tests.js';
import { exit } from './exit.js';
import { format } from '../helpers/format.js';
import { isQuiet } from '../helpers/logs.js';
import { hr } from '../helpers/hr.js';
import { fileResults } from '../services/run-test-file.js';
import { indentation } from '../helpers/indentation.js';

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

  if (configs?.parallel) {
    if (showLogs) {
      hr();
      console.log(`${format.bold('Running the Test Suite in Parallel')}${EOL}`);
    }

    const concurrency = await Promise.all(
      dirs.map((dir) => runTestsParallel(dir, configs))
    );

    if (concurrency.some((result) => !result)) code = 1;

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

    return;
  }

  for (const dir of dirs) {
    const result = await runTests(dir, configs);

    if (!result) code = 1;
  }

  if (configs?.noExit) return code;

  exit(code, configs?.quiet);
}
