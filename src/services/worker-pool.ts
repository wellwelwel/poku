import { Worker } from 'node:worker_threads';
import { format } from './format.js';

export type WorkerResult = {
  exitCode: number;
  output: string;
  timedOut: boolean;
};

type PooledWorker = {
  worker: Worker;
  busy: boolean;
  outputChunks: string[];
};

type QueuedTask = {
  filePath: string;
  timeout?: number;
  resolve: (result: WorkerResult) => void;
};

let workerScript: string;
let workerExecArgv: string[] | undefined;
let pool: WorkerPool | undefined;

class WorkerPool {
  private idle: PooledWorker[] = [];
  private all: Set<PooledWorker> = new Set();
  private queue: QueuedTask[] = [];
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  run(filePath: string, timeout?: number): Promise<WorkerResult> {
    return new Promise((resolve) => {
      const idle = this.idle.pop();

      if (idle) {
        this.dispatch(idle, filePath, timeout, resolve);
        return;
      }

      if (this.all.size < this.maxSize) {
        const pooled = this.createWorker();
        this.dispatch(pooled, filePath, timeout, resolve);
        return;
      }

      this.queue.push({ filePath, timeout, resolve });
    });
  }

  shutdown(): void {
    for (const pooled of this.all) pooled.worker.terminate();

    this.all.clear();
    this.idle.length = 0;
    this.queue.length = 0;
  }

  private createWorker(): PooledWorker {
    const worker = new Worker(workerScript, {
      stdout: true,
      stderr: true,
      execArgv: workerExecArgv,
    });

    const pooled: PooledWorker = {
      worker,
      busy: false,
      outputChunks: [],
    };

    if (worker.stdout) worker.stdout.setEncoding('utf8');
    if (worker.stderr) worker.stderr.setEncoding('utf8');

    worker.unref();

    this.all.add(pooled);
    return pooled;
  }

  private dispatch(
    pooled: PooledWorker,
    filePath: string,
    timeout: number | undefined,
    resolve: (result: WorkerResult) => void
  ): void {
    pooled.busy = true;
    pooled.outputChunks.length = 0;
    pooled.worker.ref();

    let outputSize = 0;
    let settled = false;
    let killTimer: ReturnType<typeof setTimeout> | undefined;

    const stdOut = (data: string): void => {
      if (outputSize < 10_485_760) {
        pooled.outputChunks.push(data);
        outputSize += data.length;
      }
    };

    if (pooled.worker.stdout) pooled.worker.stdout.on('data', stdOut);
    if (pooled.worker.stderr) pooled.worker.stderr.on('data', stdOut);

    const settle = (result: WorkerResult): void => {
      if (settled) return;
      settled = true;

      if (killTimer) clearTimeout(killTimer);

      if (pooled.worker.stdout) pooled.worker.stdout.removeListener('data', stdOut);
      if (pooled.worker.stderr) pooled.worker.stderr.removeListener('data', stdOut);
      pooled.worker.removeListener('message', onMessage);
      pooled.worker.removeListener('error', onExit);
      pooled.worker.removeListener('exit', onExit);

      resolve(result);

      if (!result.timedOut) {
        pooled.busy = false;

        const next = this.queue.shift();
        if (next) {
          this.dispatch(pooled, next.filePath, next.timeout, next.resolve);
        } else {
          pooled.worker.unref();
          this.idle.push(pooled);
        }
      }
    };

    const onMessage = (msg: {
      type: string;
      exitCode?: number;
      output?: string;
    }): void => {
      if (msg.type === 'done') {
        const pipeOutput = pooled.outputChunks.join('');
        settle({
          exitCode: msg.exitCode ?? 1,
          output: pipeOutput || msg.output || '',
          timedOut: false,
        });
      }
    };

    const onExit = (): void => {
      this.removeWorker(pooled);
      settle({
        exitCode: 1,
        output: pooled.outputChunks.join(''),
        timedOut: false,
      });
    };

    pooled.worker.on('message', onMessage);
    pooled.worker.once('error', onExit);
    pooled.worker.once('exit', onExit);

    if (timeout) {
      killTimer = setTimeout(() => {
        pooled.outputChunks.push(
          `${format(`● Timeout: test file exceeded ${timeout}ms limit`).fail().bold()}`
        );

        this.all.delete(pooled);
        pooled.worker.terminate();

        settle({
          exitCode: 1,
          output: pooled.outputChunks.join(''),
          timedOut: true,
        });
      }, timeout);
    }

    pooled.worker.postMessage({ file: filePath });
  }

  private removeWorker(pooled: PooledWorker): void {
    this.all.delete(pooled);

    const idleIndex = this.idle.indexOf(pooled);
    if (idleIndex !== -1) this.idle.splice(idleIndex, 1);
  }
}

export const initPool = (
  concurrency: number,
  script: string,
  execArgv?: string[]
): void => {
  workerScript = script;
  workerExecArgv = execArgv;
  pool = new WorkerPool(concurrency);
};

export const getPool = (): WorkerPool | undefined => pool;

export const terminatePool = (): void => {
  if (pool) {
    pool.shutdown();
    pool = undefined;
  }
};
