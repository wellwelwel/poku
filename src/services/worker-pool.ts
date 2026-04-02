import { Worker } from 'node:worker_threads';

type WorkerResult = { file: string; exitCode: number; output: string };

export class WorkerPool {
  private size: number;
  private workers: Worker[] = [];
  private available: Worker[] = [];
  private waitQueue: Array<(worker: Worker) => void> = [];
  private seq = 0;
  private workerScript: string;
  private workerOptions: { execArgv?: string[] };

  constructor(
    size: number,
    workerScript: string,
    workerOptions: { execArgv?: string[] }
  ) {
    this.size = size;
    this.workerScript = workerScript;
    this.workerOptions = workerOptions;
  }

  async init(): Promise<void> {
    const ready: Promise<Worker>[] = [];
    for (let i = 0; i < this.size; i++) ready.push(this.spawnWorker());
    await Promise.all(ready);
  }

  private spawnWorker(): Promise<Worker> {
    return new Promise((resolve) => {
      const worker = new Worker(this.workerScript, {
        execArgv: this.workerOptions.execArgv,
      });

      const onReady = (msg: { type: string }) => {
        if (msg.type === 'ready') {
          worker.off('message', onReady);
          this.workers.push(worker);
          this.available.push(worker);
          resolve(worker);
        }
      };

      worker.on('message', onReady);
    });
  }

  async runFile(file: string, timeout?: number): Promise<WorkerResult> {
    const seq = ++this.seq;
    const worker = await this.acquire();

    return await new Promise((resolve) => {
      let timer: ReturnType<typeof setTimeout> | undefined;

      const done = () => {
        worker.off('message', onMessage);
        worker.removeAllListeners('exit');
        if (timer) clearTimeout(timer);
      };

      const onMessage = (msg_1: WorkerResult & { type: string }) => {
        if (msg_1.type !== 'result') return;
        done();
        this.release(worker);
        resolve(msg_1);
      };

      const onExit = (code_1: number) => {
        done();
        this.replaceWorker(worker);
        resolve({ file, exitCode: code_1 ?? 1, output: '' });
      };

      worker.once('exit', onExit);
      worker.on('message', onMessage);

      if (timeout) {
        timer = setTimeout(() => {
          done();
          worker.terminate();
          this.replaceWorker(worker);
          resolve({ file, exitCode: 1, output: '' });
        }, timeout);
      }

      worker.postMessage({ type: 'run', file, seq });
    });
  }

  private acquire(): Promise<Worker> {
    const w = this.available.pop();
    if (w) return Promise.resolve(w);
    return new Promise((resolve) => this.waitQueue.push(resolve));
  }

  private release(worker: Worker): void {
    const waiter = this.waitQueue.shift();
    if (waiter) waiter(worker);
    else this.available.push(worker);
  }

  private async replaceWorker(dead: Worker): Promise<void> {
    const idx = this.workers.indexOf(dead);
    if (idx !== -1) this.workers.splice(idx, 1);
    const fresh = await this.spawnWorker();
    this.release(fresh);
  }

  destroy(): void {
    for (const w of this.workers) {
      w.removeAllListeners();
      w.terminate();
    }
    this.workers = [];
    this.available = [];
    this.waitQueue = [];
  }
}
