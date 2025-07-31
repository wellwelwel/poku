import type {
  Cleanup,
  SharedResourceEntry,
} from '../@types/shared-resources.js';
import { relative } from 'node:path';
import { exit } from 'node:process';
import { deepOptions, GLOBAL, results } from '../configs/poku.js';
import { hasOnly } from '../parsers/get-arg.js';
import { availableParallelism } from '../polyfills/os.js';
import { hr, log } from '../services/write.js';
import { format } from './format.js';
import { runTestFile } from './run-test-file.js';
import {
  executeResourceFiles,
  separateResourceFiles,
} from './shared-resource-loader.js';

const { cwd } = GLOBAL;

if (hasOnly) deepOptions.push('--only');

export const runTests = async (files: string[]): Promise<boolean> => {
  const { resourceFiles, testFiles } = separateResourceFiles(files);

  const registry: Record<string, SharedResourceEntry> = Object.create(null);
  const cleanupMethods: Record<string, Cleanup> = Object.create(null);

  if (GLOBAL.configs.sharedResources) {
    await executeResourceFiles(resourceFiles, registry, cleanupMethods);
  }

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
    resolveDone = resolve;

    for (const [key, method] of Object.entries(cleanupMethods)) {
      method(registry[key].state as SharedResourceEntry);
    }
  });

  const runNext = async () => {
    if (testFiles.length === 0 && activeTests === 0) {
      resolveDone(allPassed);
      return;
    }

    const filePath = testFiles.shift();
    if (typeof filePath === 'undefined') return;

    activeTests++;

    const testPassed = await runTestFile(filePath, registry);

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
