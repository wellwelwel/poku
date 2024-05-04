import process from 'node:process';
import { EOL } from 'node:os';
import path from 'node:path';
import { runner } from '../helpers/runner.js';
import { indentation } from '../helpers/indentation.js';
import {
  isFile as IS_FILE,
  listFiles,
  sanitizePath,
} from '../modules/list-files.js';
import { hr } from '../helpers/hr.js';
import { format } from '../helpers/format.js';
import { runTestFile } from './run-test-file.js';
import { Configs } from '../@types/poku.js';
import { isQuiet } from '../helpers/logs.js';

export const results = {
  success: 0,
  fail: 0,
};

export const runTests = async (
  dir: string,
  configs?: Configs
): Promise<boolean> => {
  const cwd = process.cwd();
  const testDir = path.join(cwd, sanitizePath(dir));
  const currentDir = path.relative(cwd, testDir);
  const isFile = IS_FILE(testDir);
  const files = isFile ? [testDir] : listFiles(testDir, undefined, configs);
  const totalTests = files.length;
  const showLogs = !isQuiet(configs);

  let passed = true;

  if (showLogs) {
    hr();
    console.log(
      `${format.bold(isFile ? 'File:' : 'Directory:')} ${format.underline(`./${currentDir}`)}${EOL}`
    );
  }

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    const fileRelative = path.relative(cwd, filePath);

    const testPassed = await runTestFile(filePath, configs);

    const testNumber = i + 1;
    const counter = format.counter(testNumber, totalTests);
    const command = `${runner(fileRelative, configs).join(' ')} ${fileRelative}`;
    const nextLine = i + 1 !== files.length ? EOL : '';
    const log = `${counter}/${totalTests} ${command}`;

    if (testPassed) {
      ++results.success;

      showLogs &&
        console.log(
          `${indentation.test}${format.success('✔')} ${log}`,
          nextLine
        );
    } else {
      ++results.fail;

      showLogs &&
        console.log(`${indentation.test}${format.fail('✘')} ${log}`, nextLine);
      passed = false;

      if (configs?.fastFail) return passed;
    }
  }

  return passed;
};

export const runTestsParallel = async (
  dir: string,
  configs?: Configs
): Promise<boolean> => {
  const cwd = process.cwd();
  const testDir = path.join(cwd, dir);
  const files = IS_FILE(dir) ? [dir] : listFiles(testDir, undefined, configs);

  const promises = files.map(async (filePath) => {
    const testPassed = await runTestFile(filePath, configs);

    if (!testPassed) {
      ++results.fail;
      return false;
    }

    ++results.success;

    return true;
  });

  const concurrency = await Promise.all(promises);

  return concurrency.every((result) => result);
};
