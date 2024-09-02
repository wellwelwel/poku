import type { Configs } from '../@types/poku.js';
import { cwd as processCWD, hrtime, env } from 'node:process';
import { relative } from 'node:path';
import { spawn } from 'node:child_process';
import { indentation } from '../configs/indentation.js';
import { fileResults } from '../configs/files.js';
import { isWindows, runner } from '../parsers/get-runner.js';
import { format } from './format.js';
import { isQuiet, parserOutput } from '../parsers/output.js';
import { beforeEach, afterEach } from './each.js';
import { Write } from './write.js';

const cwd = processCWD();

export const runTestFile = async (
  filePath: string,
  configs?: Configs
): Promise<boolean> => {
  const runtimeOptions = runner(filePath, configs);
  const runtime = runtimeOptions.shift()!;
  const runtimeArguments = [
    ...runtimeOptions,
    /* c8 ignore next 5 */ // Varies Platform
    configs?.deno?.cjs === true ||
    (Array.isArray(configs?.deno?.cjs) &&
      configs.deno.cjs.some((ext) => filePath.includes(ext)))
      ? 'https://cdn.jsdelivr.net/npm/poku/lib/polyfills/deno.mjs'
      : filePath,
  ];

  const fileRelative = relative(cwd, filePath);
  const showLogs = !isQuiet(configs);

  let output = '';

  const stdOut = (data: Buffer): void => {
    output += String(data);
  };

  if (!configs?.parallel) {
    showLogs &&
      Write.log(
        `${indentation.test}${format('●').info().dim()} ${format(fileRelative).dim()}`
      );
  }

  const start = hrtime();
  let end: ReturnType<typeof hrtime>;

  if (!(await beforeEach(fileRelative, configs))) return false;

  return new Promise((resolve) => {
    const child = spawn(runtime, runtimeArguments, {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: isWindows,
      env: {
        ...env,
        FILE: configs?.parallel || configs?.deno?.cjs ? fileRelative : '',
      },
    });

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', stdOut);
    child.stderr.on('data', stdOut);

    child.on('close', async (code) => {
      end = hrtime(start);

      const result = code === 0;

      if (showLogs) {
        const mappedOutputs = parserOutput({
          output,
          result,
          configs,
        });

        mappedOutputs && Write.log(mappedOutputs.join('\n'));
      }

      if (!(await afterEach(fileRelative, configs))) {
        resolve(false);
        return;
      }

      const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

      if (result) fileResults.success.set(fileRelative, total);
      else fileResults.fail.set(fileRelative, total);

      resolve(result);
    });

    /* c8 ignore next 10 */ // Unknown external error
    child.on('error', (err) => {
      end = hrtime(start);

      const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

      console.error(`Failed to start test: ${filePath}`, err);
      fileResults.fail.set(fileRelative, total);

      resolve(false);
    });
  });
};
