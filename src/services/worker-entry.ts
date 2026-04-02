import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { parentPort } from 'node:worker_threads';

const port = parentPort!;

const stdoutWrite = process.stdout.write.bind(process.stdout);
const stderrWrite = process.stderr.write.bind(process.stderr);
const originalExit = process.exit.bind(process);

class WorkerExit {
  code: number;
  constructor(code: number) {
    this.code = code;
  }
}

const cleanup = () => {
  process.stdout.write = stdoutWrite;
  process.stderr.write = stderrWrite;
  process.exitCode = 0;
};

port.on('message', async (msg: { type: string; file: string; seq: number }) => {
  if (msg.type !== 'run') return;

  cleanup();
  const outputChunks: string[] = [];

  process.stdout.write = (
    chunk: string | Uint8Array,
    ..._args: unknown[]
  ): boolean => {
    outputChunks.push(String(chunk));
    return true;
  };

  process.stderr.write = (
    chunk: string | Uint8Array,
    ..._args: unknown[]
  ): boolean => {
    outputChunks.push(String(chunk));
    return true;
  };

  process.exit = ((code?: number): never => {
    throw new WorkerExit(code ?? 0);
  }) as typeof process.exit;

  let exitCode = 0;
  try {
    await import(`${pathToFileURL(msg.file).href}?t=${msg.seq}`);
  } catch (error) {
    if (error instanceof WorkerExit) exitCode = error.code;
    else exitCode = 1;
  }

  if (process.exitCode !== 0) exitCode = process.exitCode as number;

  process.exit = originalExit;
  cleanup();

  port.postMessage({
    type: 'result',
    file: msg.file,
    exitCode,
    output: outputChunks.length === 1 ? outputChunks[0] : outputChunks.join(''),
  });
});

port.postMessage({ type: 'ready' });
