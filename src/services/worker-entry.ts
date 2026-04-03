import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { parentPort, workerData } from 'node:worker_threads';

const WORKER_EXIT = Object.freeze({ __workerExit: true });

const isWorkerExit = (e: unknown): boolean =>
  e !== null && typeof e === 'object' && '__workerExit' in e;

const { options } = workerData ?? {};
if (options) for (const opt of options as string[]) process.argv.push(opt);

process.exitCode = 0;

process.exit = ((code?: number): never => {
  process.exitCode = code ?? process.exitCode ?? 0;
  throw WORKER_EXIT;
}) as typeof process.exit;

process.on('uncaughtException', (error) => {
  if (isWorkerExit(error)) return;
  process.exitCode = 1;
});

process.on('unhandledRejection', (reason) => {
  if (isWorkerExit(reason)) return;
  process.exitCode = 1;
});

parentPort!.once('message', async (msg: { file: string }) => {
  try {
    await import(pathToFileURL(msg.file).href);
  } catch (error) {
    if (!isWorkerExit(error)) {
      process.exitCode = 1;
      console.error(error);
    }
  }

  parentPort!.postMessage({ type: 'done', exitCode: process.exitCode ?? 0 });
});
