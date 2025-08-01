import type { Registry } from '../@types/shared-resources.js';
import { spawn } from 'node:child_process';
import { relative } from 'node:path';
import { env, hrtime } from 'node:process';
import { deepOptions, GLOBAL, VERSION } from '../configs/poku.js';
import { setupSharedResourceIPC } from '../modules/helpers/shared-resources.js';
import { runner } from '../parsers/get-runner.js';
import { isWindows } from '../parsers/os.js';
import { parserOutput } from '../parsers/output.js';
import { afterEach, beforeEach } from './each.js';

export const runTestFile = async (
  path: string,
  registry?: Registry
): Promise<boolean> => {
  const { cwd, configs, reporter } = GLOBAL;
  const runtimeOptions = runner(path);
  const runtime = runtimeOptions.shift()!;
  const runtimeArguments = [
    ...runtimeOptions,
    /* c8 ignore next 5 */ // Varies Platform
    configs.deno?.cjs === true ||
    (Array.isArray(configs.deno?.cjs) &&
      configs.deno.cjs.some((ext) => path.includes(ext)))
      ? `https://cdn.jsdelivr.net/npm/poku${VERSION ? `@${VERSION}` : ''}/lib/polyfills/deno.mjs`
      : path,
  ];

  const file = relative(cwd, path);
  const showLogs = !configs.quiet;

  let output = '';

  const stdOut = (data: Buffer): void => {
    output += String(data);
  };

  const start = hrtime();
  let end: ReturnType<typeof hrtime>;

  if (!(await beforeEach(file))) return false;

  reporter.onFileStart({
    path: {
      relative: file,
      absolute: path,
    },
  });

  return new Promise((resolve) => {
    const child = spawn(runtime, [...runtimeArguments, ...deepOptions], {
      stdio: GLOBAL.configs.sharedResources
        ? ['inherit', 'pipe', 'pipe', 'ipc']
        : ['inherit', 'pipe', 'pipe'],
      serialization: (() => {
        if (!GLOBAL.configs.sharedResources) return undefined;
        if (runtime === 'bun') return 'json';
        return 'advanced';
      })(),
      shell: isWindows,
      env: {
        ...env,
        POKU_FILE: file,
        POKU_RUNTIME: env.POKU_RUNTIME,
        POKU_REPORTER: configs.reporter,
        POKU_SHARED_RESOURCES: String(configs.sharedResources),
      },
    });

    child.stdout!.setEncoding('utf8');
    child.stderr!.setEncoding('utf8');
    child.stdout!.on('data', stdOut);
    child.stderr!.on('data', stdOut);

    if (configs.sharedResources) setupSharedResourceIPC(child, registry);

    child.on('close', async (code) => {
      end = hrtime(start);

      const result = code === 0;

      if (showLogs) {
        const parsedOutputs = parserOutput({
          output,
          result,
        })?.join('\n');

        const total = end[0] * 1e3 + end[1] / 1e6;

        reporter.onFileResult({
          status: result,
          path: {
            relative: file,
            absolute: path,
          },
          duration: total,
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
      end = hrtime(start);

      const total = end[0] * 1e3 + end[1] / 1e6;

      if (showLogs) console.error(`Failed to start test: ${path}`, err);

      reporter.onFileResult({
        status: false,
        path: {
          relative: file,
          absolute: path,
        },
        duration: total,
      });

      resolve(false);
    });
  });
};
