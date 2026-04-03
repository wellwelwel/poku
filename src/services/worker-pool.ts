import { Worker } from 'node:worker_threads';

type WorkerResult = { file: string; exitCode: number; output: string };

export const createWorkerPool = (
  maxSize: number,
  workerScript: string,
  execArgv: string[] | undefined
) => {
  let spawned = 0;
  let seq = 0;
  let destroyed = false;
  const allWorkers: Worker[] = [];
  const idle: Worker[] = [];
  const waiters: Array<(worker: Worker) => void> = [];

  const spawnWorker = (): Promise<Worker> =>
    new Promise((resolve) => {
      const w = new Worker(workerScript, { execArgv });
      ++spawned;

      const onReady = (msg: { type: string }) => {
        if (msg.type !== 'ready') return;
        w.off('message', onReady);
        allWorkers.push(w);
        resolve(w);
      };

      w.on('message', onReady);
    });

  const release = (worker: Worker): void => {
    if (destroyed) return;
    const waiter = waiters.shift();
    if (waiter) waiter(worker);
    else idle.push(worker);
  };

  const removeWorker = (dead: Worker): void => {
    const idx = allWorkers.indexOf(dead);
    if (idx !== -1) allWorkers.splice(idx, 1);
    --spawned;
    if (waiters.length > 0) spawnWorker().then(release);
  };

  const acquire = (): Promise<Worker> => {
    const w = idle.pop();
    if (w) return Promise.resolve(w);
    if (spawned < maxSize) return spawnWorker();
    return new Promise((resolve) => {
      waiters.push(resolve);
    });
  };

  const runFile = (file: string, timeout?: number): Promise<WorkerResult> => {
    const s = ++seq;

    return acquire().then(
      (worker) =>
        new Promise((resolve) => {
          let timer: ReturnType<typeof setTimeout> | undefined;

          const cleanup = () => {
            worker.off('message', onMessage);
            worker.off('exit', onExit);
            if (timer) clearTimeout(timer);
          };

          const onMessage = (msg: WorkerResult & { type: string }) => {
            if (msg.type !== 'result') return;
            cleanup();
            release(worker);
            resolve(msg);
          };

          const onExit = (code: number) => {
            cleanup();
            removeWorker(worker);
            resolve({ file, exitCode: code ?? 1, output: '' });
          };

          worker.on('message', onMessage);
          worker.once('exit', onExit);

          if (timeout) {
            timer = setTimeout(() => {
              cleanup();
              worker.terminate();
              removeWorker(worker);
              resolve({ file, exitCode: 1, output: '' });
            }, timeout);
          }

          worker.postMessage({ type: 'run', file, seq: s });
        })
    );
  };

  const destroy = (): void => {
    destroyed = true;
    for (let i = 0; i < allWorkers.length; ++i) {
      allWorkers[i].removeAllListeners();
      allWorkers[i].terminate();
    }
    allWorkers.length = 0;
    idle.length = 0;
    waiters.length = 0;
    spawned = 0;
  };

  return { runFile, destroy };
};

export type WorkerPool = ReturnType<typeof createWorkerPool>;
