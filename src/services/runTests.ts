import path from 'path';
import { EOL } from 'os';
import { runner } from '../helpers/runner.js';
import { indentation } from '../helpers/indentation.js';
import { getFiles } from '../helpers/getFiles.js';
import { hr } from '../helpers/hr.js';
import { format } from '../helpers/format.js';
import { runTestFile } from './runTestFile.js';
import { Configs } from '../@types/poku.js';
import { isQuiet } from '../helpers/logs.js';

export const runTests = async (
  dir: string,
  configs?: Configs
): Promise<boolean> => {
  const cwd = process.cwd();
  const testDir = path.join(cwd, dir);
  const currentDir = path.relative(cwd, testDir);
  const files = getFiles(testDir, undefined, configs);
  const totalTests = files.length;
  const showLogs = !isQuiet(configs);

  let passed = true;

  if (showLogs) {
    hr();
    console.log(
      `${format.bold('Directory:')} ${format.underline(currentDir)}${EOL}`
    );
  }

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    const fileRelative = path.relative(cwd, filePath);

    const testPassed = await runTestFile(filePath, configs);

    const testNumber = i + 1;
    const counter = format.counter(testNumber, totalTests);
    const command = `${runner(fileRelative)} ${fileRelative}`;
    const nextLine = i + 1 !== files.length ? EOL : '';
    const log = `${counter}/${totalTests} ${command}${nextLine}`;

    if (testPassed) {
      showLogs &&
        console.log(`${indentation.test}${format.success('✔')} ${log}`);
    } else {
      showLogs && console.log(`${indentation.test}${format.fail('✖')} ${log}`);
      passed = false;
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
  const files = getFiles(testDir, undefined, configs);
  const showLogs = !isQuiet(configs);

  const promises = files.map(async (filePath) => {
    const fileRelative = path.relative(cwd, filePath);
    const testPassed = await runTestFile(filePath, configs);
    const command = `${runner(fileRelative)} ${fileRelative}`;

    if (testPassed) {
      showLogs &&
        console.log(`${indentation.test}${format.success('✔')} ${command}`);
    } else {
      showLogs &&
        console.log(`${indentation.test}${format.fail('✖')} ${command}`);
      return false;
    }
    return true;
  });

  const results = await Promise.all(promises);
  return results.every((result) => result);
};
