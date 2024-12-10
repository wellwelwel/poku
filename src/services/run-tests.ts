import type { Configs } from '../@types/poku.js';
import process from 'node:process';
import { join } from 'node:path';
import { listFiles } from '../modules/helpers/list-files.js';
import { Write } from '../services/write.js';
import { format } from './format.js';
import { runTestFile } from './run-test-file.js';
import { isQuiet } from '../parsers/output.js';
import { deepOptions, results } from '../configs/poku.js';
import { availableParallelism } from '../polyfills/os.js';
import { hasOnly, hasDescribeOnly, hasItOnly } from '../parsers/get-arg.js';

const cwd = process.cwd();
const failFastError = `  ${format('ℹ').fail()} ${format('failFast').bold()} is enabled`;

if (hasDescribeOnly) deepOptions.push('--only=describe');
else if (hasItOnly) deepOptions.push('--only=it');
else if (hasOnly) deepOptions.push('--only');

export const runTests = async (
  dir: string,
  configs?: Configs
): Promise<boolean> => {
  let allPassed = true;
  let activeTests = 0;
  let resolveDone: (value: boolean) => void;
  let rejectDone: (reason?: Error) => void;

  const testDir = join(cwd, dir);
  const files = await listFiles(testDir, configs);
  const showLogs = !isQuiet(configs);
  const concurrency: number = (() => {
    if (configs?.sequential) return 1;
    const limit =
      configs?.concurrency ?? Math.max(availableParallelism() - 1, 1);
    return limit <= 0 ? files.length || 1 : limit;
  })();

  const done = new Promise<boolean>((resolve, reject) => {
    resolveDone = resolve;
    rejectDone = reject;
  });

  const runNext = async () => {
    if (files.length === 0 && activeTests === 0) {
      resolveDone(allPassed);
      return;
    }

    const filePath = files.shift();
    if (typeof filePath === 'undefined') return;

    activeTests++;

    try {
      const testPassed = await runTestFile(filePath, configs);

      if (testPassed) ++results.success;
      else {
        ++results.fail;
        allPassed = false;

        if (configs?.failFast) {
          if (showLogs) {
            Write.hr();
            console.error(failFastError);
            Write.hr();
          }

          process.exit(1);
        }
      }
    } finally {
      activeTests--;
    }

    runNext().catch(rejectDone);
  };

  for (let i = 0; i < concurrency; i++) runNext();

  return await done;
};
