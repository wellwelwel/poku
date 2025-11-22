import { relative } from 'node:path';
import { exit } from 'node:process';
import { deepOptions, GLOBAL, results } from '../configs/poku.js';
import { globalRegistry } from '../modules/helpers/shared-resources.js';
import { hasOnly } from '../parsers/get-arg.js';
import { availableParallelism } from '../polyfills/os.js';
import { hr, log } from '../services/write.js';
import { format } from './format.js';
import { runTestFile } from './run-test-file.js';

const { cwd } = GLOBAL;
const resourceFileRegex = /\.resource\.[cm]?[jt]s$/i;

if (hasOnly) deepOptions.push('--only');

export const runTests = async (files: string[]): Promise<boolean> => {
  const testFiles = files.filter((file) => !resourceFileRegex.test(file));

  let allPassed = true;
  let activeTests = 0;
  let resolveDone: (value: boolean) => void;

  const { configs } = GLOBAL;
  const showLogs = !configs.quiet;
  const failFastError = `  ${format('ℹ').fail()} ${format('failFast').bold()} is enabled`;
  const concurrency: number = (() => {
    if (configs.sequential) return 1;
    const limit =
      configs.concurrency ?? Math.max(availableParallelism() - 1, 1);
    return limit <= 0 ? testFiles.length || 1 : limit;
  })();
  const isSequential = concurrency === 1;

  const done = new Promise<boolean>((resolve) => {
    resolveDone = async (passed: boolean) => {
      if (GLOBAL.configs.sharedResources) {
        const entries = Object.values(globalRegistry);
        for (const entry of entries) {
          if (entry.cleanup) await entry.cleanup(entry.state);
        }
      }
      resolve(passed);
    };
  });

  const runNext = async () => {
    if (testFiles.length === 0 && activeTests === 0) {
      resolveDone(allPassed);
      return;
    }

    const filePath = testFiles.shift();
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

        exit(1);
      }
    }

    activeTests--;

    isSequential ? await runNext() : runNext();
  };

  for (let i = 0; i < concurrency; i++)
    isSequential ? await runNext() : runNext();

  return done;
};
