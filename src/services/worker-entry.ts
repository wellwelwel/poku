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

const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleInfo = console.info;

parentPort!.on('message', async (msg: { file?: string; type?: string }) => {
  if (msg.type === 'shutdown' || !msg.file) return;

  process.exitCode = 0;

  const outputChunks: string[] = [];

  const capture = (chunk: string | Uint8Array): boolean => {
    outputChunks.push(String(chunk));
    return true;
  };

  process.stdout.write = (chunk: string | Uint8Array, ..._args: unknown[]) =>
    capture(chunk);
  process.stderr.write = (chunk: string | Uint8Array, ..._args: unknown[]) =>
    capture(chunk);
  console.log = (...args: unknown[]) => capture(`${args.join(' ')}\n`);
  console.error = (...args: unknown[]) => capture(`${args.join(' ')}\n`);
  console.warn = (...args: unknown[]) => capture(`${args.join(' ')}\n`);
  console.info = (...args: unknown[]) => capture(`${args.join(' ')}\n`);

  try {
    await import(`${pathToFileURL(msg.file).href}?t=${Date.now()}`);
  } catch (error) {
    if (!isWorkerExit(error)) process.exitCode = 1;
  }

  // Allow pending microtasks to flush before collecting results
  await new Promise<void>((resolve) => setTimeout(resolve, 0));

  process.stdout.write = originalStdoutWrite;
  process.stderr.write = originalStderrWrite;
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
  console.info = originalConsoleInfo;

  parentPort!.postMessage({
    type: 'done',
    exitCode: process.exitCode ?? 0,
    output: outputChunks.join(''),
  });
});
