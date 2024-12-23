import process from 'node:process';
import { relative, join } from 'node:path';
import { listFiles } from '../modules/helpers/list-files.js';
import { log, hr } from '../services/write.js';
import { format } from './format.js';
import { runTestFile } from './run-test-file.js';
import { deepOptions, GLOBAL, results } from '../configs/poku.js';
import { availableParallelism } from '../polyfills/os.js';
import { hasOnly } from '../parsers/get-arg.js';

const { cwd } = GLOBAL;
const failFastError = `  ${format('ℹ').fail()} ${format('failFast').bold()} is enabled`;

if (hasOnly) deepOptions.push('--only');

export const runTests = async (dir: string): Promise<boolean> => {
  let allPassed = true;
  let activeTests = 0;
  let resolveDone: (value: boolean) => void;
  let rejectDone: (reason?: Error) => void;

  const testDir = join(cwd, dir);
  const files = await listFiles(testDir, GLOBAL.configs);
  const showLogs = !GLOBAL.configs.quiet;
  const concurrency: number = (() => {
    if (GLOBAL.configs.sequential) return 1;
    const limit =
      GLOBAL.configs.concurrency ?? Math.max(availableParallelism() - 1, 1);
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
      const testPassed = await runTestFile(filePath);

      if (testPassed) ++results.success;
      else {
        ++results.fail;
        allPassed = false;

        if (GLOBAL.configs.failFast) {
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
    } finally {
      activeTests--;
    }

    runNext().catch(rejectDone);
  };

  for (let i = 0; i < concurrency; i++) runNext();

  return await done;
};
