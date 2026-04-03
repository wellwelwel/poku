import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { workerData } from 'node:worker_threads';

const { file } = workerData;
const WORKER_EXIT = Object.freeze({ __workerExit: true });

process.exitCode = 0;

process.exit = ((code?: number): never => {
  process.exitCode = code ?? process.exitCode ?? 0;
  throw WORKER_EXIT;
}) as typeof process.exit;

(async () => {
  try {
    await import(pathToFileURL(file).href);
  } catch (error) {
    if (error !== WORKER_EXIT) process.exitCode = 1;
  }
})();
