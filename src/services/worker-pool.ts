import { Worker } from 'node:worker_threads';

type WorkerResult = { exitCode: number; output: string; timedOut: boolean };

interface PooledWorker {
  worker: Worker;
  outputChunks: string[];
}

let pool: PooledWorker[] = [];
let available: PooledWorker[] = [];
let waiters: ((pw: PooledWorker) => void)[] = [];
let poolConfig: {
  workerScript: string;
  execArgv: string[] | undefined;
  options: string[] | undefined;
};

const createPooledWorker = (): PooledWorker => {
  const pw: PooledWorker = {
    outputChunks: [],
    worker: new Worker(poolConfig.workerScript, {
      workerData: { options: poolConfig.options },
      execArgv: poolConfig.execArgv,
      stdout: true,
      stderr: true,
    }),
  };

  if (pw.worker.stdout) {
    pw.worker.stdout.setEncoding('utf8');
    pw.worker.stdout.on('data', (chunk: string) => pw.outputChunks.push(chunk));
  }
  if (pw.worker.stderr) {
    pw.worker.stderr.setEncoding('utf8');
    pw.worker.stderr.on('data', (chunk: string) => pw.outputChunks.push(chunk));
  }

  return pw;
};

const replaceWorker = (pw: PooledWorker): PooledWorker => {
  pw.worker.terminate();
  const idx = pool.indexOf(pw);
  const replacement = createPooledWorker();
  if (idx >= 0) pool[idx] = replacement;
  return replacement;
};

const acquire = (): PooledWorker | Promise<PooledWorker> => {
  const pw = available.pop();
  if (pw) return pw;
  return new Promise((resolve) => waiters.push(resolve));
};

const release = (pw: PooledWorker): void => {
  const waiter = waiters.shift();
  if (waiter) waiter(pw);
  else available.push(pw);
};

export const initPool = (
  size: number,
  workerScript: string,
  execArgv: string[] | undefined,
  options?: string[]
): void => {
  poolConfig = { workerScript, execArgv, options };
  for (let i = 0; i < size; i++) {
    const pw = createPooledWorker();
    pool.push(pw);
    available.push(pw);
  }
};

export const terminatePool = async (): Promise<void> => {
  await Promise.all(pool.map((pw) => pw.worker.terminate()));
  pool = [];
  available = [];
  waiters = [];
};

export const runInWorker = async (
  file: string,
  timeout?: number
): Promise<WorkerResult> => {
  const pw = await acquire();

  return new Promise((resolve) => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
      pw.worker.removeListener('message', onMessage);
      pw.worker.removeListener('error', onError);
    };

    const settle = (exitCode: number, timedOut: boolean) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      cleanup();
      const output = pw.outputChunks.join('');
      // Single-use: always replace after each test
      release(replaceWorker(pw));
      resolve({ exitCode, output, timedOut });
    };

    const onMessage = (msg: { type: string; exitCode: number }) => {
      if (msg.type === 'done') settle(msg.exitCode, false);
    };

    const onError = () => settle(1, false);

    pw.worker.on('message', onMessage);
    pw.worker.once('error', onError);

    if (timeout) {
      timer = setTimeout(() => settle(1, true), timeout);
    }

    pw.worker.postMessage({ file });
  });
};
