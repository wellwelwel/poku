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
const failFastError = `  ${format('ℹ').fail()} ${format('failFast').bold()} is enabled`;

if (hasDescribeOnly) deepOptions.push('--only=describe');
else if (hasItOnly) deepOptions.push('--only=it');
else if (hasOnly) deepOptions.push('--only');

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
          Write.log(failFastError);
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
  let allPassed = true;
  let failFastTriggered = false;
  let activeTests = 0;
  let resolveDone: (value: boolean) => void;
  let rejectDone: (reason?: Error) => void;

  const testDir = join(cwd, dir);
  const files = await listFiles(testDir, configs);
  const showLogs = !isQuiet(configs);
  const concurrency: number = (() => {
    const limit =
      configs?.concurrency ?? Math.max(availableParallelism() - 1, 1);
    return limit <= 0 ? files.length || 1 : limit;
  })();

  const done = new Promise<boolean>((resolve, reject) => {
    resolveDone = resolve;
    rejectDone = reject;
  });

  const runNext = async () => {
    if (failFastTriggered || files.length === 0) {
      if (activeTests === 0 && !failFastTriggered) resolveDone(allPassed);
      return;
    }

    const filePath = files.shift()!;

    activeTests++;

    try {
      const testPassed = await runTestFile(filePath, configs);

      if (testPassed) ++results.success;
      else {
        ++results.fail;
        allPassed = false;

        if (configs?.failFast) {
          failFastTriggered = true;
          process.exitCode = 1;

          throw new Error(failFastError);
        }
      }
    } catch (error) {
      error instanceof Error && rejectDone(error);
      return;
    } finally {
      activeTests--;
    }

    runNext().catch(rejectDone);
  };

  try {
    for (let i = 0; i < concurrency; i++) runNext();

    return await done;
  } catch (error) {
    if (showLogs && error instanceof Error) {
      Write.hr();
      console.error(error.message);
    }

    return false;
  }
};
