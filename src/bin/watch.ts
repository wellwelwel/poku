import type { Watcher } from '../services/watch.js';
import process from 'node:process';
import { GLOBAL } from '../configs/poku.js';
import { results } from '../configs/results.js';
import { onSigint, poku } from '../modules/essentials/poku.js';
import { getArg } from '../parsers/get-arg.js';
import { availableParallelism } from '../polyfills/os.js';
import { format } from '../services/format.js';
import { mapTests, normalizePath } from '../services/map-tests.js';
import { errors } from '../services/reporters/poku.js';
import { watch } from '../services/watch.js';
import { hr, log } from '../services/write.js';

export const startWatch = async (dirs: string[]) => {
  let isRunning = false;

  const { configs } = GLOBAL;
  const watchers: Set<Watcher> = new Set();
  const executing = new Set<string>();
  const interval = Number(getArg('watchInterval')) || 1500;

  const addWatcher = (pending: Promise<Watcher>): void => {
    pending.then((watcher) => {
      watchers.add(watcher);
    });
  };

  const resultsClear = (): void => {
    errors.length = 0;
    results.passed = 0;
    results.failed = 0;
    results.skipped = 0;
    results.todo = 0;
  };

  const listenStdin = async (input: Buffer | string): Promise<void> => {
    if (isRunning || executing.size > 0) return;

    if (String(input).trim() === 'rs') {
      for (const watcher of watchers) watcher.stop();

      watchers.clear();
      resultsClear();
      await poku(dirs);
    }
  };

  process.stdin.removeListener('data', listenStdin);
  process.removeListener('SIGINT', onSigint);
  resultsClear();

  const mappedTests = await mapTests(
    '.',
    dirs,
    configs.filter,
    configs.exclude
  );

  for (const mappedTest of Array.from(mappedTests.keys())) {
    const currentWatcher = watch(mappedTest, async (file, event) => {
      if (event === 'change') {
        const filePath = normalizePath(file);
        if (executing.has(filePath) || isRunning || executing.size > 0) return;

        isRunning = true;
        executing.add(filePath);
        resultsClear();

        const tests = mappedTests.get(filePath);
        if (!tests) return;

        await poku(Array.from(tests), {
          ...configs,
          concurrency:
            configs.concurrency ??
            Math.max(Math.floor(availableParallelism() / 2), 1),
        });

        setTimeout(() => {
          executing.delete(filePath);
          isRunning = false;
        }, interval);
      }
    });

    addWatcher(currentWatcher);
  }

  for (const dir of dirs) {
    const currentWatcher = watch(dir, (file, event) => {
      if (event === 'change') {
        if (executing.has(file) || isRunning || executing.size > 0) return;

        isRunning = true;
        executing.add(file);
        resultsClear();

        poku(file).then(() =>
          setTimeout(() => {
            executing.delete(file);
            isRunning = false;
          }, interval)
        );
      }
    });

    addWatcher(currentWatcher);
  }

  hr();
  log(`${format('Watching:').bold()} ${format(dirs.join(', ')).underline()}`);

  process.on('SIGTERM', () => {
    for (const watcher of watchers) watcher.stop();
    process.exit(0);
  });

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', listenStdin);
};
