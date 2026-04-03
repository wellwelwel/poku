import { Worker } from 'node:worker_threads';

type WorkerResult = { exitCode: number; output: string };

export const runInWorker = (
  file: string,
  workerScript: string,
  execArgv: string[] | undefined,
  timeout?: number
): Promise<WorkerResult> =>
  new Promise((resolve, reject) => {
    let w: Worker;

    try {
      w = new Worker(workerScript, {
        execArgv,
        stdout: true,
        stderr: true,
      });
    } catch (error) {
      reject(error);
      return;
    }

    const outputChunks: string[] = [];
    let timer: ReturnType<typeof setTimeout> | undefined;
    let resolved = false;

    w.stdout.setEncoding('utf8');
    w.stderr.setEncoding('utf8');
    w.stdout.on('data', (chunk: string) => outputChunks.push(chunk));
    w.stderr.on('data', (chunk: string) => outputChunks.push(chunk));

    const finish = (exitCode: number) => {
      if (resolved) return;
      resolved = true;
      if (timer) clearTimeout(timer);
      w.terminate().then(() => {
        resolve({ exitCode, output: outputChunks.join('') });
      });
    };

    w.on('message', (msg: { type: string; exitCode?: number }) => {
      if (msg.type === 'ready') {
        w.postMessage({ type: 'run', file, seq: Date.now() });
        return;
      }
      if (msg.type === 'result') {
        finish(msg.exitCode ?? 1);
      }
    });

    w.on('error', () => finish(1));

    w.once('exit', (code) => {
      if (resolved) return;
      resolved = true;
      if (timer) clearTimeout(timer);
      resolve({ exitCode: code ?? 1, output: outputChunks.join('') });
    });

    if (timeout) {
      timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          w.terminate().then(() => {
            resolve({ exitCode: 1, output: outputChunks.join('') });
          });
        }
      }, timeout);
    }
  });
