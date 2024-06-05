import process from 'node:process';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { indentation } from '../configs/indentation.js';
import { fileResults } from '../configs/files.js';
import { isWindows, runner } from '../helpers/runner.js';
import { format } from '../helpers/format.js';
import { isQuiet, printOutput } from '../helpers/logs.js';
import { beforeEach, afterEach } from './each.js';
/* c8 ignore next */
import type { Configs } from '../@types/poku.js';

export const runTestFile = (
  filePath: string,
  configs?: Configs
): Promise<boolean> =>
  new Promise(async (resolve) => {
    /* c8 ignore start */
    const runtimeOptions = runner(filePath, configs);
    const runtime = runtimeOptions.shift()!;
    const runtimeArguments = [
      ...runtimeOptions,
      configs?.deno?.cjs === true ||
      (Array.isArray(configs?.deno?.cjs) &&
        configs.deno.cjs.some((ext) => filePath.includes(ext)))
        ? 'https://cdn.jsdelivr.net/npm/poku/lib/polyfills/deno.mjs'
        : filePath,
    ];
    /* c8 ignore stop */

    const fileRelative = path.relative(process.cwd(), filePath);
    const showLogs = !isQuiet(configs);

    let output = '';

    const stdOut = (data: Buffer): void => {
      output += String(data);
    };

    if (!configs?.parallel) {
      showLogs &&
        console.log(
          `${indentation.test}${format.info(format.dim('●'))} ${format.dim(fileRelative)}`
        );
    }

    if (!(await beforeEach(fileRelative, configs))) return false;

    // Export spawn helper is not an option
    const child = spawn(runtime, runtimeArguments, {
      stdio: ['inherit', 'pipe', 'pipe'],
      /* c8 ignore next */
      shell: isWindows,
      env: {
        ...process.env,
        FILE: configs?.parallel || configs?.deno?.cjs ? fileRelative : '',
      },
    });

    child.stdout.on('data', stdOut);

    child.stderr.on('data', stdOut);

    child.on('close', async (code) => {
      if (showLogs)
        printOutput({
          output,
          runtime,
          runtimeArguments,
          fileRelative,
          configs,
        });

      if (!(await afterEach(fileRelative, configs))) return false;

      const result = code === 0;

      if (result) fileResults.success.push(fileRelative);
      else fileResults.fail.push(fileRelative);

      resolve(result);
    });

    /* c8 ignore start */
    child.on('error', (err) => {
      console.log(`Failed to start test: ${filePath}`, err);
      fileResults.fail.push(fileRelative);

      resolve(false);
    });
    /* c8 ignore stop */
  });
