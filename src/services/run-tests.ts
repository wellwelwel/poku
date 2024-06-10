import process from 'node:process';
import { EOL } from 'node:os';
import { join, relative } from 'node:path';
import { runner } from '../helpers/runner.js';
import { indentation } from '../configs/indentation.js';
import {
  isFile as IS_FILE,
  listFiles,
  sanitizePath,
} from '../modules/list-files.js';
import { hr } from '../helpers/hr.js';
import { format } from '../helpers/format.js';
import { runTestFile } from './run-test-file.js';
import { isQuiet, write } from '../helpers/logs.js';
/* c8 ignore next */
import type { Configs } from '../@types/poku.js';

const cwd = process.cwd();

/* c8 ignore start */
export const results = {
  success: 0,
  fail: 0,
};
/* c8 ignore stop */

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
    hr();
    write(
      `${format.bold(isFile ? 'File:' : 'Directory:')} ${format.underline(`./${currentDir}`)}${EOL}`
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
    const counter = format.counter(testNumber, totalTests);
    const command = `${runner(fileRelative, configs).join(' ')} ${fileRelative} ${format.dim(`› ${total}ms`)}`;
    const nextLine = i + 1 !== files.length ? EOL : '';
    const log = `${counter}/${totalTests} ${command} `;

    if (testPassed) {
      ++results.success;

      showLogs &&
        write(`${indentation.test}${format.success('✔')} ${log}${nextLine}`);
    } else {
      ++results.fail;

      showLogs &&
        write(`${indentation.test}${format.fail('✘')} ${log}${nextLine}`);

      passed = false;

      if (configs?.failFast) {
        hr();
        write(`  ${format.fail('ℹ')} ${format.bold('fail-fast')} is enabled`);
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
  const files = (await IS_FILE(dir))
    ? [sanitizePath(dir)]
    : await listFiles(testDir, configs);
  const filesByConcurrency: string[][] = [];
  const concurrencyLimit = configs?.concurrency || 0;
  const concurrencyResults: (boolean | undefined)[][] = [];

  if (concurrencyLimit > 0)
    for (let i = 0; i < files.length; i += concurrencyLimit) {
      filesByConcurrency.push(files.slice(i, i + concurrencyLimit));
    }
  else filesByConcurrency.push(files);

  try {
    for (const fileGroup of filesByConcurrency) {
      const promises = fileGroup.map(async (filePath) => {
        if (configs?.failFast && results.fail > 0) return;

        const testPassed = await runTestFile(filePath, configs);

        if (!testPassed) {
          ++results.fail;

          if (configs?.failFast)
            throw `  ${format.fail('ℹ')} ${format.bold('fail-fast')} is enabled`;

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
    hr();
    console.error(error);

    return false;
  }
};
