import { join, relative } from 'node:path';
import process from 'node:process';
import { deepOptions, GLOBAL, results } from '../configs/poku.js';
import { listFiles } from '../modules/helpers/list-files.js';
import { hasOnly } from '../parsers/get-arg.js';
import { availableParallelism } from '../polyfills/os.js';
import { hr, log } from '../services/write.js';
import { format } from './format.js';
import { runTestFile } from './run-test-file.js';

const { cwd } = GLOBAL;

if (hasOnly) deepOptions.push('--only');

export const runTests = async (dir: string): Promise<boolean> => {
  let allPassed = true;
  let activeTests = 0;
  let resolveDone: (value: boolean) => void;

  const { configs } = GLOBAL;
  const testDir = join(cwd, dir);
  const files = await listFiles(testDir, configs);
  const showLogs = !configs.quiet;
  const failFastError = `  ${format('ℹ').fail()} ${format('failFast').bold()} is enabled`;
  const concurrency: number = (() => {
    if (configs.sequential) return 1;
    const limit =
      configs.concurrency ?? Math.max(availableParallelism() - 1, 1);
    return limit <= 0 ? files.length || 1 : limit;
  })();

  const done = new Promise<boolean>((resolve) => {
    resolveDone = resolve;
  });

  const runNext = async () => {
    if (files.length === 0 && activeTests === 0) {
      resolveDone(allPassed);
      return;
    }

    const filePath = files.shift();
    if (typeof filePath === 'undefined') return;

    activeTests++;

    const testPassed = await runTestFile(filePath);

    if (testPassed) ++results.passed;
    else {
      ++results.failed;
      allPassed = false;

      if (configs.failFast) {
        if (showLogs) {
          hr();
          console.error(failFastError);
          log(
            `\n    ${format('File:').bold()} ${format(`./${relative(cwd, filePath)}`).fail()}`
          );
          hr();
        }

        process.exit(1);
      }
    }

    activeTests--;

    await runNext();
  };

  for (let i = 0; i < concurrency; i++)
    concurrency === 1 ? await runNext() : runNext();

  return await done;
};
