import process from 'node:process';
import { spawn } from 'node:child_process';
import { runner, scriptRunner } from '../helpers/runner.js';
import path from 'node:path';
import {
  StartScriptOptions,
  StartServiceOptions,
} from '../@types/background-process.js';
import { sanitizePath } from './list-files.js';

/* c8 ignore start */
const runningProcesses: { [key: number]: () => void } = {};

const secureEnds = () =>
  Object.values(runningProcesses).forEach((end) => end());

process.once('SIGINT', () => {
  secureEnds();
});
/* c8 ignore end */

const backgroundProcess = (
  runtime: string,
  args: string[],
  file: string,
  options?: StartServiceOptions & { isScript?: boolean; runner?: string }
): Promise<{ end: () => void }> =>
  new Promise((resolve, reject) => {
    let isResolved = false;

    const service = spawn(runtime, args, {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: false,
      cwd: options?.cwd ? sanitizePath(path.normalize(options.cwd)) : undefined,
      env: process.env,
    });

    const PID = service.pid!;

    /* c8 ignore start */
    const end = () => {
      delete runningProcesses[PID];

      process.kill(PID);

      return;
    };

    runningProcesses[PID] = end;
    /* c8 ignore end */

    service.stdout.on('data', (data: Buffer) => {
      if (!isResolved && typeof options?.startAfter !== 'number') {
        const stringData = JSON.stringify(String(data));

        if (
          typeof options?.startAfter === 'undefined' ||
          (typeof options?.startAfter === 'string' &&
            stringData.includes(options?.startAfter))
        ) {
          resolve({ end });
          clearTimeout(timeout);

          isResolved = true;
        }
      }

      options?.verbose && console.log(String(data));
    });

    service.stderr.on('data', (data: Buffer) => {
      if (!isResolved && typeof options?.startAfter !== 'number') {
        const stringData = JSON.stringify(String(data));

        if (
          typeof options?.startAfter === 'undefined' ||
          (typeof options?.startAfter === 'string' &&
            stringData.includes(options?.startAfter))
        ) {
          resolve({ end });
          clearTimeout(timeout);

          isResolved = true;
        }
      }

      options?.verbose && console.log(String(data));
    });

    service.on('error', (err) => {
      secureEnds();
      reject(`Service failed to start: ${err}`);
    });

    service.on('close', (code) => {
      if (code !== 0) reject(`Service exited with code ${code}`);
    });

    const timeout = setTimeout(() => {
      if (!isResolved) {
        secureEnds();
        reject(`createService: Timeout\nFile: ${file}`);
      }
    }, options?.timeout || 10000);

    if (typeof options?.startAfter === 'number') {
      setTimeout(() => {
        if (!isResolved) {
          resolve({ end });
          clearTimeout(timeout);

          isResolved = true;
        }
      }, options.startAfter);
    }
  });

/**
 *
 * Starts a file in a background process
 *
 * Useful for servers, APIs, etc.
 */
export const startService = async (
  file: string,
  options?: StartServiceOptions
): Promise<{ end: () => void }> => {
  const runtimeOptions = runner(file, { platform: options?.platform });
  const runtime = runtimeOptions.shift()!;
  const runtimeArgs = [...runtimeOptions, file];

  return await backgroundProcess(
    runtime,
    runtimeArgs,
    path.normalize(sanitizePath(file)),
    options
  );
};

/**
 *
 * Starts a script (package.json) or task (deno.json) in a background process
 *
 * By default, it uses **npm**, but you can costumize it using the `runner` option.
 *
 * Useful for servers, APIs, etc.
 */
export const startScript = async (
  script: string,
  options?: StartScriptOptions
): Promise<{ end: () => void }> => {
  const runner = options?.runner || 'npm';
  const runtimeOptions = scriptRunner(runner);
  const runtime = runtimeOptions.shift()!;
  const runtimeArgs = [...runtimeOptions, script];

  return await backgroundProcess(runtime, runtimeArgs, script, {
    ...options,
    isScript: true,
    runner,
  });
};
