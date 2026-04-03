import { Worker } from 'node:worker_threads';

type WorkerResult = { exitCode: number; output: string };

export const runInWorker = (
  file: string,
  workerScript: string,
  execArgv: string[] | undefined,
  timeout?: number
): Promise<WorkerResult> =>
  new Promise((resolve) => {
    const outputChunks: string[] = [];
    let resolved = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const w = new Worker(workerScript, {
      workerData: { file },
      execArgv,
      stdout: true,
      stderr: true,
    });

    w.stdout.setEncoding('utf8');
    w.stderr.setEncoding('utf8');
    w.stdout.on('data', (chunk: string) => outputChunks.push(chunk));
    w.stderr.on('data', (chunk: string) => outputChunks.push(chunk));

    w.once('exit', (code) => {
      if (resolved) return;
      resolved = true;
      if (timer) clearTimeout(timer);
      resolve({ exitCode: code ?? 1, output: outputChunks.join('') });
    });

    if (timeout) {
      timer = setTimeout(() => {
        if (!resolved) w.terminate();
      }, timeout);
    }
  });
