import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { parentPort } from 'node:worker_threads';

const port = parentPort!;

const stdoutWrite = process.stdout.write.bind(process.stdout);
const stderrWrite = process.stderr.write.bind(process.stderr);

const WORKER_EXIT = { code: 0 };

let outputChunks: string[] = [];
let capturing = false;

process.stdout.write = (
  chunk: string | Uint8Array,
  ..._args: unknown[]
): boolean => {
  if (capturing) outputChunks.push(String(chunk));
  else stdoutWrite(chunk);
  return true;
};

process.stderr.write = (
  chunk: string | Uint8Array,
  ..._args: unknown[]
): boolean => {
  if (capturing) outputChunks.push(String(chunk));
  else stderrWrite(chunk);
  return true;
};

process.exit = ((code?: number): never => {
  WORKER_EXIT.code = code ?? 0;
  throw WORKER_EXIT;
}) as typeof process.exit;

port.on('message', async (msg: { type: string; file: string; seq: number }) => {
  if (msg.type !== 'run') return;

  outputChunks = [];
  capturing = true;
  process.exitCode = 0;

  let exitCode = 0;
  try {
    await import(`${pathToFileURL(msg.file).href}?t=${msg.seq}`);
  } catch (error) {
    if (error === WORKER_EXIT) exitCode = WORKER_EXIT.code;
    else exitCode = 1;
  }

  if (process.exitCode !== 0) exitCode = process.exitCode as number;

  capturing = false;

  port.postMessage({
    type: 'result',
    file: msg.file,
    exitCode,
    output: outputChunks.length === 1 ? outputChunks[0] : outputChunks.join(''),
  });
});

port.postMessage({ type: 'ready' });
