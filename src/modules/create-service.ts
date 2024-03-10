import process from 'node:process';
import { spawn } from 'node:child_process';
import { runner, scriptRunner } from '../helpers/runner.js';
import path from 'node:path';
import {
  StartScriptOptions,
  StartServiceOptions,
} from '../@types/background-process.js';
import { sanitizePath } from './list-files.js';

const backgroundProcess = (
  runtime: string,
  args: string[],
  file: string,
  options?: StartServiceOptions
): Promise<{ end: () => boolean }> =>
  new Promise((resolve, reject) => {
    let isResolved = false;

    const service = spawn(runtime, args, {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: false,
      cwd: options?.cwd ? sanitizePath(path.normalize(options.cwd)) : undefined,
      env: process.env,
    });

    const end = () => service.kill('SIGKILL');

    service.stdout.on('data', (data: Buffer) => {
      if (!isResolved && typeof options?.startAfter !== 'number') {
        const stringData = String(data);

        if (
          typeof options?.startAfter === 'undefined' ||
          (typeof options?.startAfter === 'string' &&
            stringData.includes(options.startAfter))
        ) {
          resolve({ end });
          clearTimeout(timeout);

          isResolved = true;
        }
      }

      options?.verbose && console.log(String(data));
    });

    service.stderr.on('data', (data: Buffer) => {
      reject(new Error(`Service failed to start: ${data}`));
    });

    service.on('error', (err) => {
      reject(new Error(`Service failed to start: ${err}`));
    });

    service.on('close', (code) => {
      if (code !== 0) reject(new Error(`Service exited with code ${code}`));
    });

    const timeout = setTimeout(() => {
      if (!isResolved) {
        service.kill();
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
): Promise<{ end: () => boolean }> => {
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
): Promise<{ end: () => boolean }> => {
  const runtimeOptions = scriptRunner(options?.runner || 'npm');
  const runtime = runtimeOptions.shift()!;
  const runtimeArgs = [...runtimeOptions, script];

  return await backgroundProcess(runtime, runtimeArgs, script, options);
};
