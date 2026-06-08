import type {
  End,
  StartScriptOptions,
  StartServiceOptions,
} from '../../@types/background-process.js';
import { spawn } from 'node:child_process';
import { normalize } from 'node:path';
import process from 'node:process';
import { runner, scriptRunner } from '../../parsers/get-runner.js';
import { isWindows } from '../../parsers/os.js';
import { log } from '../../services/write.js';
import { kill } from './kill.js';
import { sanitizePath } from './list-files.js';

const runningProcesses: Map<number, End> = new Map();

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
        shell: false,
        detached: !isWindows,
        windowsHide: isWindows,
      });

      const PID = service.pid!;

      service.stdout.setEncoding('utf8');
      service.stderr.setEncoding('utf8');

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
            )
              process.kill(PID);
            else process.kill(-PID, 'SIGKILL');

            if (port) {
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

      runningProcesses.set(PID, end);

      const onData = (data: Buffer) => {
        if (!isResolved && typeof options?.startAfter !== 'number') {
          if (
            typeof options?.startAfter === 'undefined' ||
            (typeof options?.startAfter === 'string' &&
              String(data).includes(options.startAfter))
          ) {
            resolve({ end });
            clearTimeout(timeout);

            isResolved = true;
          }
        }

        options?.verbose && log(data);
      };

      service.stdout.on('data', onData);
      service.stderr.on('data', onData);

      service.on('error', (err) => {
        end();
        reject(`Service failed to start: ${err}`);
      });

      service.on('close', (code) => {
        if (code !== 0) reject(`Service exited with code ${code}`);
      });

      const timeout = setTimeout(() => {
        if (!isResolved) {
          end();
          reject(`createService: Timeout\nFile: ${file}`);
        }
      }, options?.timeout || 60000);

      if (typeof options?.startAfter === 'number')
        setTimeout(() => {
          if (!isResolved) {
            resolve({ end });
            clearTimeout(timeout);

            isResolved = true;
          }
        }, options.startAfter);
    } catch {}
  });

/** Starts a file in a background process */
export const startService = (
  file: string,
  options?: StartServiceOptions
): Promise<{ end: End }> => {
  const runtimeOptions = runner(file);
  const runtime = runtimeOptions.shift()!;
  const runtimeArgs = [...runtimeOptions, file];

  return backgroundProcess(
    runtime,
    runtimeArgs,
    normalize(sanitizePath(file)),
    options
  );
};

/** Starts a script in a background process */
export const startScript = (
  script: string,
  options?: StartScriptOptions
): Promise<{ end: End }> => {
  const runner = options?.runner ?? 'npm';
  const runtimeOptions = scriptRunner(runner);
  const runtime = runtimeOptions.shift()!;
  const runtimeArgs = [...runtimeOptions, script];

  return backgroundProcess(runtime, runtimeArgs, script, {
    ...options,
    runner,
  });
};

process.once('SIGINT', async () => {
  for (const end of runningProcesses.values()) await end();
});
