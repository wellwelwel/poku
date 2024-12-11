import type { WatchCallback } from '../@types/watch.js';
import { watch as nodeWatch, type FSWatcher } from 'node:fs';
import { join } from 'node:path';
import { readdir, stat } from 'node:fs/promises';
import { listFiles } from '../modules/helpers/list-files.js';

export class Watcher {
  private rootDir: string;
  private files: string[] = [];
  private fileWatchers: Map<string, FSWatcher> = new Map();
  private dirWatchers: Map<string, FSWatcher> = new Map();
  private callback: WatchCallback;

  constructor(rootDir: string, callback: WatchCallback) {
    this.rootDir = rootDir;
    this.callback = callback;
  }

  private watchFile(filePath: string) {
    if (this.fileWatchers.has(filePath)) return;

    const watcher = nodeWatch(filePath, (eventType) =>
      this.callback(filePath, eventType)
    );

    this.fileWatchers.set(filePath, watcher);
  }

  private unwatchFiles() {
    for (const [filePath, watcher] of this.fileWatchers) {
      watcher.close();
      this.fileWatchers.delete(filePath);
    }
  }

  private watchFiles(filePaths: string[]) {
    this.unwatchFiles();

    for (const filePath of filePaths) this.watchFile(filePath);
  }

  private async watchDirectory(dir: string) {
    if (this.dirWatchers.has(dir)) return;

    const watcher = nodeWatch(dir, async (_, filename) => {
      if (filename) {
        const fullPath = join(dir, filename);

        this.files = await listFiles(this.rootDir);
        this.watchFiles(this.files);

        try {
          const stats = await stat(fullPath);
          if (stats.isDirectory()) await this.watchDirectory(fullPath);
        } catch {}
      }
    });

    this.dirWatchers.set(dir, watcher);

    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const fullPath = join(dir, entry.name);
      await this.watchDirectory(fullPath);
    }
  }

  async start() {
    const stats = await stat(this.rootDir);

    if (stats.isDirectory()) {
      this.files = await listFiles(this.rootDir);

      this.watchFiles(this.files);
      await this.watchDirectory(this.rootDir);

      return;
    }

    this.watchFile(this.rootDir);
  }

  stop() {
    this.unwatchFiles();
    this.unwatchDirectories();
  }

  private unwatchDirectories() {
    for (const [dirPath, watcher] of this.dirWatchers) {
      watcher.close();
      this.dirWatchers.delete(dirPath);
    }
  }
}

export const watch = async (path: string, callback: WatchCallback) => {
  const watcher = new Watcher(path, callback);

  await watcher.start();

  return watcher;
};
