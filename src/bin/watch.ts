import { mapTests, normalizePath } from '../services/map-tests.js';
import { watch, type Watcher } from '../services/watch.js';
import { onSigint, poku } from '../modules/essentials/poku.js';
import { Write } from '../services/write.js';
import process from 'node:process';
import type { Configs } from '../@types/poku.js';
import { format } from '../services/format.js';
import { getArg } from '../parsers/get-arg.js';
import { fileResults } from '../configs/files.js';

export const startWatch = async (dirs: string[], options: Configs) => {
  let isRunning = false;

  const watchers: Set<Watcher> = new Set();
  const executing = new Set<string>();
  const interval = Number(getArg('watch-interval')) || 1500;

  const setIsRunning = (value: boolean) => {
    isRunning = value;
  };

  const resultsClear = () => {
    fileResults.success.clear();
    fileResults.fail.clear();
  };

  const listenStdin = async (input: Buffer | string) => {
    if (isRunning || executing.size > 0) {
      return;
    }

    if (String(input).trim() === 'rs') {
      for (const watcher of watchers) {
        watcher.stop();
      }

      watchers.clear();
      resultsClear();
      await poku(dirs, options);
    }
  };

  process.stdin.removeListener('data', listenStdin);
  process.removeListener('SIGINT', onSigint);
  resultsClear();

  const mappedTests = await mapTests(
    '.',
    dirs,
    options.filter,
    options.exclude
  );

  for (const mappedTest of Array.from(mappedTests.keys())) {
    const currentWatcher = watch(mappedTest, async (file, event) => {
      if (event === 'change') {
        const filePath = normalizePath(file);
        if (executing.has(filePath) || isRunning || executing.size > 0) {
          return;
        }

        setIsRunning(true);
        executing.add(filePath);
        resultsClear();

        const tests = mappedTests.get(filePath);
        if (!tests) {
          return;
        }

        await poku(Array.from(tests), options);
        setTimeout(() => {
          executing.delete(filePath);
          setIsRunning(false);
        }, interval);
      }
    });

    currentWatcher.then((watcher) => watchers.add(watcher));
  }

  for (const dir of dirs) {
    const currentWatcher = watch(dir, (file, event) => {
      if (event === 'change') {
        if (executing.has(file) || isRunning || executing.size > 0) {
          return;
        }

        setIsRunning(true);
        executing.add(file);
        resultsClear();

        poku(file, options).then(() => {
          setTimeout(() => {
            executing.delete(file);
            setIsRunning(false);
          }, interval);
        });
      }
    });

    currentWatcher.then((watcher) => watchers.add(watcher));
  }

  Write.hr();
  Write.log(
    `${format('Watching:').bold()} ${format(dirs.join(', ')).underline()}`
  );

  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', listenStdin);
};
