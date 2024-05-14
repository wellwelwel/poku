import process from 'node:process';
import { spawn } from 'node:child_process';
import { isWindows, runner, scriptRunner } from '../helpers/runner.js';
import path from 'node:path';
import {
  End,
  StartScriptOptions,
  StartServiceOptions,
} from '../@types/background-process.js';
import { sanitizePath } from './list-files.js';
import { findPID, killPID } from '../services/pid.js';

/* c8 ignore start */
const runningProcesses: Map<number, { end: End; port?: number }> = new Map();

const secureEnds = () => runningProcesses.forEach(({ end, port }) => end(port));

process.once('SIGINT', () => {
  secureEnds();
});
/* c8 ignore stop */

const backgroundProcess = (
  runtime: string,
  args: string[],
  file: string,
  options?: StartServiceOptions & { runner?: string }
): Promise<{ end: End }> =>
  new Promise((resolve, reject) => {
    try {
      let isResolved = false;

      const service = spawn(runtime, args, {
        stdio: ['inherit', 'pipe', 'pipe'],
        /* c8 ignore next */
        shell: isWindows,
        cwd: options?.cwd
          ? sanitizePath(path.normalize(options.cwd))
          : undefined,
        env: process.env,
        /* c8 ignore next */
        detached: !isWindows,
        /* c8 ignore next */
        windowsHide: isWindows,
        timeout: options?.timeout,
      });

      const PID = service.pid!;

      let portBackup: number | undefined;

      /* c8 ignore start */
      const end: End = (port?: number) =>
        new Promise((resolve) => {
          try {
            runningProcesses.delete(PID);

            if (isWindows) {
              killPID.windows(PID);
              return;
            }

            if (
              ['bun', 'deno'].includes(runtime) ||
              ['bun', 'deno'].includes(String(options?.runner))
            ) {
              process.kill(PID);
            } else process.kill(-PID, 'SIGKILL');

            if (port) {
              setTimeout(async () => {
                const PIDs = isWindows
                  ? await findPID.windows(port)
                  : await findPID.unix(port);

                PIDs.forEach(async (subPID) => {
                  if (subPID)
                    isWindows
                      ? await killPID.windows(subPID)
                      : await killPID.unix(subPID);
                });

                resolve(undefined);
                return;
              }, 250);
            } else {
              resolve(undefined);
              return;
            }
          } catch {
            {
              resolve(undefined);
              return;
            }
          }
        });

      runningProcesses.set(PID, { end, port: portBackup });
      /* c8 ignore stop */

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
        end(portBackup);
        reject(`Service failed to start: ${err}`);
      });

      service.on('close', (code) => {
        if (code !== 0) reject(`Service exited with code ${code}`);
      });

      const timeout = setTimeout(() => {
        if (!isResolved) {
          end(portBackup);
          reject(`createService: Timeout\nFile: ${file}`);
        }
      }, options?.timeout || 60000);

      if (typeof options?.startAfter === 'number') {
        setTimeout(() => {
          if (!isResolved) {
            resolve({ end });
            clearTimeout(timeout);

            isResolved = true;
          }
        }, options.startAfter);
      }
    } catch {}
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
): Promise<{ end: End }> => {
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
 *
 * ---
 *
 * For **Bun**, please see https://github.com/oven-sh/bun/issues/11055
 */
export const startScript = async (
  script: string,
  options?: StartScriptOptions
): Promise<{ end: End }> => {
  const runner = options?.runner || 'npm';
  const runtimeOptions = scriptRunner(runner);
  const runtime = runtimeOptions.shift()!;
  const runtimeArgs = [...runtimeOptions, script];

  return await backgroundProcess(runtime, runtimeArgs, script, {
    ...options,
    runner,
  });
};
