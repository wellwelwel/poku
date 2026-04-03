import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { workerData } from 'node:worker_threads';

const { file, options } = workerData;
const WORKER_EXIT = Object.freeze({ __workerExit: true });

if (options) for (const opt of options as string[]) process.argv.push(opt);

process.exitCode = 0;

process.exit = ((code?: number): never => {
  process.exitCode = code ?? process.exitCode ?? 0;
  throw WORKER_EXIT;
}) as typeof process.exit;

const isWorkerExit = (e: unknown): boolean =>
  e !== null && typeof e === 'object' && '__workerExit' in e;

process.on('uncaughtException', (error) => {
  if (isWorkerExit(error)) return;
  process.exitCode = 1;
});

process.on('unhandledRejection', (reason) => {
  if (isWorkerExit(reason)) return;
  process.exitCode = 1;
});

(async () => {
  try {
    await import(pathToFileURL(file).href);
  } catch (error) {
    if (error !== WORKER_EXIT) process.exitCode = 1;
  }
})();
