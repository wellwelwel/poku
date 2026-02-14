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

if (hasOnly) deepOptions.push('--only');
if (GLOBAL.configs.sharedResources) deepOptions.push('--sharedResources');

export const runTests = async (files: string[]): Promise<boolean> => {
  let allPassed = true;
  let activeTests = 0;
  let fileIndex = 0;
  let resolveDone: (value: boolean) => void;

  const { configs } = GLOBAL;
  const limit = configs.sequential
    ? 1
    : (configs.concurrency ?? Math.max(availableParallelism() - 1, 1));
  const concurrency = limit <= 0 ? files.length || 1 : limit;

  const done = new Promise<boolean>((resolve) => {
    resolveDone = async (passed: boolean) => {
      if (GLOBAL.configs.sharedResources) {
        const entries = Object.values(globalRegistry);
        for (const entry of entries) {
          if (entry.onDestroy) await entry.onDestroy(entry.state);
        }
      }

      resolve(passed);
    };
  });

  const runNext = async () => {
    if (fileIndex >= files.length && activeTests === 0) {
      resolveDone(allPassed);
      return;
    }

    if (fileIndex >= files.length) return;

    const filePath = files[fileIndex++];

    activeTests++;

    const testPassed = await runTestFile(filePath);

    if (testPassed) ++results.passed;
    else {
      ++results.failed;
      allPassed = false;

      if (configs.failFast) {
        if (!configs.quiet) {
          hr();
          console.error(
            `  ${format('ℹ').fail()} ${format('failFast').bold()} is enabled`
          );
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
