import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { workerData } from 'node:worker_threads';

const { file } = workerData;
const WORKER_EXIT = Object.freeze({ __workerExit: true });

let exitCode = 0;

const originalExit = process.exit;
process.exitCode = 0;

process.exit = ((code?: number): never => {
  exitCode = code ?? (process.exitCode as number) ?? 0;
  throw WORKER_EXIT;
}) as typeof process.exit;

(async () => {
  try {
    await import(pathToFileURL(file).href);
    exitCode = (process.exitCode as number) ?? exitCode;
  } catch (error) {
    if (error !== WORKER_EXIT) exitCode = 1;
  }

  process.exit = originalExit;
  process.exit(exitCode);
})();
