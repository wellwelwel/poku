import { hrtime, env } from 'node:process';
import { relative } from 'node:path';
import { spawn } from 'node:child_process';
import { fileResults } from '../configs/files.js';
import { runner } from '../parsers/get-runner.js';
import { parserOutput } from '../parsers/output.js';
import { beforeEach, afterEach } from './each.js';
import { log } from './write.js';
import { deepOptions, GLOBAL, VERSION } from '../configs/poku.js';
import { isWindows } from '../parsers/os.js';

export const runTestFile = async (path: string): Promise<boolean> => {
  const { cwd, configs } = GLOBAL;
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

  return new Promise((resolve) => {
    const child = spawn(runtime, [...runtimeArguments, ...deepOptions], {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: isWindows,
      env: {
        ...env,
        POKU_FILE: file,
        POKU_RUNTIME: env.POKU_RUNTIME,
        POKU_REPORTER: configs.reporter,
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
        });

        mappedOutputs && log(mappedOutputs.join('\n'));
      }

      if (!(await afterEach(file))) {
        resolve(false);
        return;
      }

      const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

      if (result) fileResults.success.set(file, total);
      else fileResults.fail.set(file, total);

      resolve(result);
    });

    /* c8 ignore next 10 */ // Unknown external error
    child.on('error', (err) => {
      end = hrtime(start);

      const total = (end[0] * 1e3 + end[1] / 1e6).toFixed(6);

      console.error(`Failed to start test: ${path}`, err);
      fileResults.fail.set(file, total);

      resolve(false);
    });
  });
};
