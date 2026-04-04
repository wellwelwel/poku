import { stat } from 'node:fs/promises';
import { relative } from 'node:path';
import { exit } from 'node:process';
import { deepOptions, GLOBAL, results } from '../configs/poku.js';
import { hasOnly } from '../parsers/get-arg.js';
import { availableParallelism } from '../polyfills/os.js';
import { hr, log } from '../services/write.js';
import { format } from './format.js';
import { runTestFile } from './run-test-file.js';

const { cwd } = GLOBAL;

if (hasOnly) deepOptions.push('--only');

export const runTests = async (inputFiles: string[]): Promise<boolean> => {
  let allPassed = true;
  let activeTests = 0;
  let nextIndex = 0;
  let resolveDone: (value: boolean) => void;

  const { configs } = GLOBAL;
  const showLogs = !configs.quiet;
  const failFastError = `  ${format('ℹ').fail()} ${format('failFast').bold()} is enabled`;
  const totalFiles = inputFiles.length;
  const concurrency: number = (() => {
    if (configs.sequential || configs.isolation === 'none') return 1;
    const limit = configs.concurrency ?? availableParallelism();
    return limit <= 0 ? totalFiles || 1 : limit;
  })();

  let files: string[];

  if (concurrency > 1 && totalFiles > 1) {
    const sizes = await Promise.all(
      inputFiles.map(async (f) => {
        try {
          return (await stat(f)).size;
        } catch {
          return 0;
        }
      })
    );
    const indexed = inputFiles.map((f, i) => [f, sizes[i]] as const);
    indexed.sort((a, b) => b[1] - a[1]);
    files = indexed.map((x) => x[0]);
  } else {
    files = inputFiles;
  }

  const done = new Promise<boolean>((resolve) => {
    resolveDone = (passed: boolean) => {
      resolve(passed);
    };
  });

  const runNext = async (): Promise<void> => {
    if (nextIndex >= totalFiles && activeTests === 0) {
      resolveDone(allPassed);
      return;
    }

    if (nextIndex >= totalFiles) return;

    const filePath = files[nextIndex++];

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

    runNext();
  };

  for (let i = 0; i < concurrency; i++) runNext();

  return done;
};
