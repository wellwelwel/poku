import process from 'node:process';
import { pathToFileURL } from 'node:url';

const stdoutWrite = process.stdout.write.bind(process.stdout);
const stderrWrite = process.stderr.write.bind(process.stderr);

const cleanup = () => {
  process.stdout.write = stdoutWrite;
  process.stderr.write = stderrWrite;
  process.exitCode = 0;
};

process.on(
  'message',
  async (msg: { type: string; file: string; seq: number }) => {
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

    let exitCode = 0;
    try {
      await import(`${pathToFileURL(msg.file).href}?t=${msg.seq}`);
    } catch {
      exitCode = 1;
    }

    if (process.exitCode !== 0) exitCode = process.exitCode as number;
    cleanup();

    process.send!({
      type: 'result',
      file: msg.file,
      exitCode,
      output:
        outputChunks.length === 1 ? outputChunks[0] : outputChunks.join(''),
    });
  }
);

process.send!({ type: 'ready' });
