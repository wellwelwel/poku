import type { ChildProcess } from 'node:child_process';
import { fork } from 'node:child_process';

type WorkerResult = { file: string; exitCode: number; output: string };

export class WorkerPool {
  private size: number;
  private workers: ChildProcess[] = [];
  private available: ChildProcess[] = [];
  private waitQueue: Array<(worker: ChildProcess) => void> = [];
  private workerScript: string;
  private forkArgs: string[];
  private execArgv: string[];

  constructor(
    size: number,
    workerScript: string,
    forkArgs: string[],
    execArgv: string[]
  ) {
    this.size = size;
    this.workerScript = workerScript;
    this.forkArgs = forkArgs;
    this.execArgv = execArgv;
  }

  async init(): Promise<void> {
    const ready: Promise<ChildProcess>[] = [];
    for (let i = 0; i < this.size; i++) ready.push(this.spawnWorker());
    await Promise.all(ready);
  }

  private spawnWorker(): Promise<ChildProcess> {
    return new Promise((resolve) => {
      const worker = fork(this.workerScript, this.forkArgs, {
        execArgv: this.execArgv,
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
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

  runFile(file: string, seq: number, timeout?: number): Promise<WorkerResult> {
    return this.acquire().then(
      (worker) =>
        new Promise((resolve) => {
          let timer: ReturnType<typeof setTimeout> | undefined;

          const cleanup = () => {
            worker.off('message', onMessage);
            worker.removeAllListeners('exit');
            if (timer) clearTimeout(timer);
          };

          const onMessage = (msg: WorkerResult & { type: string }) => {
            if (msg.type !== 'result') return;
            cleanup();
            this.release(worker);
            resolve(msg);
          };

          const onExit = () => {
            cleanup();
            this.replaceWorker(worker);
            resolve({ file, exitCode: 1, output: '' });
          };

          worker.once('exit', onExit);
          worker.on('message', onMessage);

          if (timeout) {
            timer = setTimeout(() => {
              cleanup();
              worker.kill('SIGTERM');
              this.replaceWorker(worker);
              resolve({ file, exitCode: 1, output: '' });
            }, timeout);
          }

          worker.send({ type: 'run', file, seq });
        })
    );
  }

  private acquire(): Promise<ChildProcess> {
    const w = this.available.pop();
    if (w) return Promise.resolve(w);
    return new Promise((resolve) => this.waitQueue.push(resolve));
  }

  private release(worker: ChildProcess): void {
    const waiter = this.waitQueue.shift();
    if (waiter) waiter(worker);
    else this.available.push(worker);
  }

  private async replaceWorker(dead: ChildProcess): Promise<void> {
    const idx = this.workers.indexOf(dead);
    if (idx !== -1) this.workers.splice(idx, 1);
    const fresh = await this.spawnWorker();
    this.release(fresh);
  }

  destroy(): void {
    for (const w of this.workers) {
      w.removeAllListeners();
      w.kill('SIGTERM');
    }
    this.workers = [];
    this.available = [];
    this.waitQueue = [];
  }
}
