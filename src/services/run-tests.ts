/* c8 ignore start */ // Types
import type { Configs } from '../@types/poku.js';
import { cwd as processCWD, hrtime } from 'node:process';
import { join, relative, sep } from 'node:path';
import { runner } from '../parsers/get-runner.js';
import { indentation } from '../configs/indentation.js';
import {
  isFile as IS_FILE,
  listFiles,
  sanitizePath,
} from '../modules/helpers/list-files.js';
import { Write } from '../services/write.js';
import { format } from './format.js';
import { runTestFile } from './run-test-file.js';
import { isQuiet } from '../parsers/output.js';
import { results } from '../configs/poku.js';

const cwd = processCWD();

export const runTests = async (
  dir: string,
  configs?: Configs
): Promise<boolean> => {
  const testDir = join(cwd, dir);
  const currentDir = relative(cwd, testDir);
  const isFile = await IS_FILE(testDir);
  const files = isFile
    ? [sanitizePath(testDir)]
    : await listFiles(testDir, configs);
  const totalTests = files.length;
  const showLogs = !isQuiet(configs);

  let passed = true;

  if (showLogs) {
    Write.hr();
    Write.log(
      `${format(isFile ? 'File:' : 'Directory:').bold()} ${format(`.${sep}${currentDir}`).underline()}\n`
    );
  }

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    const fileRelative = relative(cwd, filePath);

    const start = hrtime();
    const testPassed = await runTestFile(filePath, configs);
    const end = hrtime(start);
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
      /* c8 ignore start */
    } else {
      ++results.fail;

      if (showLogs) {
        Write.log(
          `${indentation.test}${format('✘').fail()} ${log}${format(` › ${total}ms`).fail().dim()}${nextLine}`
        );
      }

      passed = false;

      if (showLogs && configs?.failFast) {
        Write.hr();
        Write.log(
          `  ${format('ℹ').fail()} ${format('fail-fast').bold()} is enabled`
        );
        break;
      }
    }
    /* c8 ignore stop */
  }

  return passed;
};

/* c8 ignore next */ // ?
export const runTestsParallel = async (
  dir: string,
  configs?: Configs
): Promise<boolean> => {
  const testDir = join(cwd, dir);
  const files = (await IS_FILE(dir))
    ? [sanitizePath(dir)]
    : await listFiles(testDir, configs);
  const filesByConcurrency: string[][] = [];
  const concurrencyLimit = configs?.concurrency || 0;
  const concurrencyResults: (boolean | undefined)[][] = [];
  const showLogs = !isQuiet(configs);

  if (concurrencyLimit > 0) {
    for (let i = 0; i < files.length; i += concurrencyLimit) {
      filesByConcurrency.push(files.slice(i, i + concurrencyLimit));
    }
  } else {
    filesByConcurrency.push(files);
  }

  try {
    for (const fileGroup of filesByConcurrency) {
      const promises = fileGroup.map(async (filePath) => {
        /* c8 ignore next 3 */
        if (configs?.failFast && results.fail > 0) {
          return;
        }

        const testPassed = await runTestFile(filePath, configs);

        /* c8 ignore start */
        if (!testPassed) {
          ++results.fail;

          if (showLogs && configs?.failFast) {
            throw new Error(
              `  ${format('ℹ').fail()} ${format('fail-fast').bold()} is enabled`
            );
          }

          return false;
        }
        /* c8 ignore false */

        ++results.success;
        return true;
      });

      const concurrency = await Promise.all(promises);
      concurrencyResults.push(concurrency);
    }

    return concurrencyResults.every((group) => group.every((result) => result));
    /* c8 ignore start */
  } catch (error) {
    Write.hr();
    error instanceof Error && console.error(error.message);

    return false;
  }
  /* c8 ignore stop */
};
