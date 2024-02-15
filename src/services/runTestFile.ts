import process from 'node:process';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { runner } from '../helpers/runner.js';
import { indentation } from '../helpers/indentation.js';
import { format } from '../helpers/format.js';
import { Configs } from '../@types/poku.js';
import { showFailures, showSuccesses, isQuiet } from '../helpers/logs.js';

export const runTestFile = (
  filePath: string,
  configs?: Configs
): Promise<boolean> =>
  new Promise((resolve) => {
    let output = '';

    const showLogs = !isQuiet(configs);
    const showSuccess = showSuccesses(configs);
    const showFailure = showFailures(configs);

    const log = () => console.log(`${indentation.stdio}${output?.trim()}`);

    const fileRelative = path.relative(process.cwd(), filePath);
    showLogs &&
      console.log(`${indentation.test}${format.info('→')} ${fileRelative}`);

    const runtimeOptions = runner(filePath);
    const runtime = runtimeOptions.shift();
    const runtimeArguments =
      runtimeOptions.length > 1 ? [...runtimeOptions, filePath] : [filePath];

    const child = spawn(runtime!, runtimeArguments, {
      stdio: ['inherit', 'pipe', 'pipe'],
      env: process.env,
    });

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      if (
        showLogs &&
        ((code === 0 && showSuccess) || (code !== 0 && showFailure))
      )
        log();

      resolve(code === 0);
    });

    child.on('error', (err) => {
      console.log(`Failed to start test: ${filePath}`, err);
      resolve(false);
    });
  });
