import type {
  End,
  StartScriptOptions,
  StartServiceOptions,
} from '../../@types/background-process.js';
import process from 'node:process';
import { spawn } from 'node:child_process';
import { isWindows, runner, scriptRunner } from '../../parsers/get-runner.js';
import { normalize } from 'node:path';
import { sanitizePath } from './list-files.js';
import { kill } from './kill.js';
import { Write } from '../../services/write.js';

const runningProcesses: Map<number, { end: End; port?: number | number[] }> =
  new Map();

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
        env: process.env,
        timeout: options?.timeout,
        cwd: options?.cwd ? sanitizePath(normalize(options.cwd)) : undefined,
        shell: isWindows,
        detached: !isWindows,
        windowsHide: isWindows,
      });

      const PID = service.pid!;

      service.stdout.setEncoding('utf8');
      service.stderr.setEncoding('utf8');

      let portBackup: number | undefined;

      const end: End = (port) =>
        new Promise((resolve) => {
          try {
            runningProcesses.delete(PID);

            if (isWindows) {
              kill.pid(PID);
              return;
            }

            if (
              ['bun', 'deno'].includes(runtime) ||
              ['bun', 'deno'].includes(String(options?.runner))
            ) {
              process.kill(PID);
            } else {
              process.kill(-PID, 'SIGKILL');
            }

            if (port && ['bun', 'deno'].includes(runtime)) {
              setTimeout(async () => {
                await kill.port(port);
                resolve(undefined);
                return;
              });
            } else {
              resolve(undefined);
              return;
            }
          } catch {
            resolve(undefined);
            return;
          }
        });

      runningProcesses.set(PID, { end, port: portBackup });

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

        options?.verbose && Write.log(data);
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

        options?.verbose && Write.log(data);
      });

      service.on('error', (err) => {
        end(portBackup);
        reject(`Service failed to start: ${err}`);
      });

      service.on('close', (code) => {
        if (code !== 0) {
          reject(`Service exited with code ${code}`);
        }
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

/** Starts a file in a background process (useful for servers, APIs, etc.) */
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
    normalize(sanitizePath(file)),
    options
  );
};

/**
 *
 * Starts a script (package.json) or task (deno.json) in a background process (useful for servers, APIs, etc.).
 *
 * ---
 *
 * By default, it uses **npm**, but you can costumize it using the `runner` option.
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

process.once('SIGINT', async () => {
  for (const { end, port } of runningProcesses.values()) {
    await end(port);
  }
});
