import { spawn } from 'node:child_process';
import { relative } from 'node:path';
import { env, hrtime } from 'node:process';
import { deepOptions, GLOBAL, VERSION } from '../configs/poku.js';
import { setupSharedResourceIPC } from '../modules/helpers/shared-resources.js';
import { runner } from '../parsers/get-runner.js';
import { parserOutput } from '../parsers/output.js';
import { afterEach, beforeEach } from './each.js';

export const runTestFile = async (path: string): Promise<boolean> => {
  const { cwd, configs, reporter } = GLOBAL;
  const [runtime, ...runtimeOptions] = runner(path);
  const args = [
    ...runtimeOptions,
    /* c8 ignore next 5 */ // Varies Platform
    configs.deno?.cjs === true ||
    (Array.isArray(configs.deno?.cjs) &&
      configs.deno.cjs.some((ext) => path.includes(ext)))
      ? `https://cdn.jsdelivr.net/npm/poku${VERSION ? `@${VERSION}` : ''}/lib/polyfills/deno.mjs`
      : path,
    ...deepOptions,
  ];

  const file = relative(cwd, path);
  const showLogs = !configs.quiet;
  const pathInfo = { relative: file, absolute: path };

  let output = '';

  const stdOut = (data: Buffer): void => {
    output += String(data);
  };

  const start = hrtime();

  if (!(await beforeEach(file))) return false;

  reporter.onFileStart({ path: pathInfo });

  return new Promise((resolve) => {
    const child = spawn(runtime, args, {
      stdio: configs.sharedResources
        ? ['inherit', 'pipe', 'pipe', 'ipc']
        : ['inherit', 'pipe', 'pipe'],
      shell: false,
      env: {
        ...env,
        POKU_FILE: file,
        POKU_REPORTER: configs.reporter,
      },
    });

    child.stdout!.setEncoding('utf8');
    child.stderr!.setEncoding('utf8');
    child.stdout!.on('data', stdOut);
    child.stderr!.on('data', stdOut);

    if (configs.sharedResources) setupSharedResourceIPC(child);

    child.on('close', async (code) => {
      const end = hrtime(start);
      const result = code === 0;

      if (showLogs) {
        const parsedOutputs = parserOutput({
          output,
          result,
        })?.join('\n');

        reporter.onFileResult({
          status: result,
          path: pathInfo,
          duration: end[0] * 1e3 + end[1] / 1e6,
          output: parsedOutputs,
        });
      }

      if (!(await afterEach(file))) {
        resolve(false);
        return;
      }

      resolve(result);
    });

    child.on('error', (err) => {
      const end = hrtime(start);

      if (showLogs) console.error(`Failed to start test: ${path}`, err);

      reporter.onFileResult({
        status: false,
        path: pathInfo,
        duration: end[0] * 1e3 + end[1] / 1e6,
      });

      resolve(false);
    });
  });
};
