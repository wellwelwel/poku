import type { Configs } from '../@types/poku.js';
import process from 'node:process';
import { join, relative, sep } from 'node:path';
import { runner } from '../parsers/get-runner.js';
import { indentation } from '../configs/indentation.js';
import { isFile as IS_FILE, listFiles } from '../modules/helpers/list-files.js';
import { Write } from '../services/write.js';
import { format } from './format.js';
import { runTestFile } from './run-test-file.js';
import { isQuiet } from '../parsers/output.js';
import { deepOptions, results } from '../configs/poku.js';
import { availableParallelism } from '../polyfills/os.js';
import { hasOnly, hasDescribeOnly, hasItOnly } from '../parsers/get-arg.js';

const cwd = process.cwd();

if (hasOnly) deepOptions.push('--only');
if (hasDescribeOnly) deepOptions.push('--describeOnly');
if (hasItOnly) deepOptions.push('--itOnly');

export const runTests = async (
  dir: string,
  configs?: Configs
): Promise<boolean> => {
  const testDir = join(cwd, dir);
  const currentDir = relative(cwd, testDir);
  const isFile = await IS_FILE(testDir);
  const files = await listFiles(testDir, configs);
  const totalTests = files.length;
  const showLogs = !isQuiet(configs);

  let passed = true;

  if (showLogs && files.length > 0) {
    Write.hr();
    Write.log(
      `${format(isFile ? 'File:' : 'Directory:').bold()} ${format(`.${sep}${currentDir}`).underline()}\n`
    );
  }

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    const fileRelative = relative(cwd, filePath);

    const start = process.hrtime();
    const testPassed = await runTestFile(filePath, configs);
    const end = process.hrtime(start);
    const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

    const testNumber = i + 1;
    const counter = format('').counter(testNumber, totalTests);
    const command = `${runner(fileRelative, configs).join(' ')} ${fileRelative}`;
    const nextLine = i + 1 !== files.length ? '\n' : '';
    const log = `${counter}/${totalTests} ${command}`;

    if (testPassed) {
      ++results.success;

      showLogs &&
        Write.log(
          `${indentation.test}${format('✔').success()} ${log}${format(` › ${total}ms`).success().dim()}${nextLine}`
        );
    } else {
      ++results.fail;

      if (showLogs) {
        Write.log(
          `${indentation.test}${format('✘').fail()} ${log}${format(` › ${total}ms`).fail().dim()}${nextLine}`
        );
      }

      passed = false;

      if (configs?.failFast) {
        process.exitCode = 1;

        if (showLogs) {
          Write.hr();
          Write.log(
            `  ${format('ℹ').fail()} ${format('failFast').bold()} is enabled`
          );
        }

        break;
      }
    }
  }

  return passed;
};

export const runTestsParallel = async (
  dir: string,
  configs?: Configs
): Promise<boolean> => {
  const testDir = join(cwd, dir);
  const files = await listFiles(testDir, configs);
  const filesByConcurrency: string[][] = [];
  const concurrencyLimit =
    configs?.concurrency ?? Math.max(availableParallelism() - 1, 1);
  const concurrencyResults: (boolean | undefined)[][] = [];
  const showLogs = !isQuiet(configs);

  if (concurrencyLimit > 0) {
    for (let i = 0; i < files.length; i += concurrencyLimit)
      filesByConcurrency.push(files.slice(i, i + concurrencyLimit));
  } else filesByConcurrency.push(files);

  try {
    for (const fileGroup of filesByConcurrency) {
      const promises = fileGroup.map(async (filePath) => {
        const testPassed = await runTestFile(filePath, configs);

        if (!testPassed) {
          ++results.fail;

          if (configs?.failFast) {
            process.exitCode = 1;

            throw new Error(
              `  ${format('ℹ').fail()} ${format('failFast').bold()} is enabled`
            );
          }

          return false;
        }

        ++results.success;
        return true;
      });

      const concurrency = await Promise.all(promises);
      concurrencyResults.push(concurrency);
    }

    return concurrencyResults.every((group) => group.every((result) => result));
  } catch (error) {
    if (showLogs) {
      Write.hr();
      error instanceof Error && console.error(error.message);
    }

    return false;
  }
};
