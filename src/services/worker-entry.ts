import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { parentPort } from 'node:worker_threads';

const port = parentPort!;

const WORKER_EXIT = { code: 0 };

process.exit = ((code?: number): never => {
  WORKER_EXIT.code = code ?? 0;
  throw WORKER_EXIT;
}) as typeof process.exit;

port.on('message', async (msg: { type: string; file: string; seq: number }) => {
  if (msg.type !== 'run') return;

  process.exitCode = 0;

  let exitCode = 0;
  try {
    await import(`${pathToFileURL(msg.file).href}?t=${msg.seq}`);
  } catch (error) {
    if (error === WORKER_EXIT) exitCode = WORKER_EXIT.code;
    else exitCode = 1;
  }

  if (process.exitCode !== 0) exitCode = process.exitCode as number;

  port.postMessage({
    type: 'result',
    file: msg.file,
    exitCode,
  });
});

port.postMessage({ type: 'ready' });
