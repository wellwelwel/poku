import process from 'node:process';
import { readdir, stat as fsStat } from 'node:fs';
import { sep, join } from 'node:path';
/* c8 ignore next */
import type { Configs } from '../@types/list-files.js';

export const sanitizePath = (input: string, ensureTarget?: boolean): string => {
  const sanitizedPath = input
    .replace(/[/\\]+/g, sep) // adapting slashes according to OS
    .replace(/(\.\.(\/|\\|$))+/g, '') // ensure the current path level
    .replace(/[<>|^?*]+/g, ''); // removing unusual path characters

  return ensureTarget ? sanitizedPath.replace(/^[/\\]/, './') : sanitizedPath;
};

export const escapeRegExp = (string: string) =>
  string.replace(/[.*{}[\]\\]/g, '\\$&');

export const isFile = (fullPath: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fsStat(fullPath, (err, stats) => {
      if (err) return reject(err);

      resolve(stats.isFile());
    });
  });
};

const envFilter = process.env.FILTER?.trim()
  ? new RegExp(escapeRegExp(process.env.FILTER), 'i')
  : undefined;

const getAllFiles = (
  dirPath: string,
  files: string[] = [],
  configs?: Configs,
  callback?: (err: NodeJS.ErrnoException | null, result?: string[]) => void
) => {
  readdir(sanitizePath(dirPath), (err, currentFiles) => {
    if (err) return callback?.(err);

    const defaultRegExp = /\.(test|spec)\./i;
    const filter: RegExp =
      (envFilter
        ? envFilter
        : configs?.filter instanceof RegExp
          ? configs.filter
          : defaultRegExp) || defaultRegExp;

    const exclude: Configs['exclude'] = configs?.exclude
      ? Array.isArray(configs.exclude)
        ? /* c8 ignore next */
          configs.exclude
        : [configs.exclude]
      : undefined;

    let pending = currentFiles.length;
    if (!pending) return callback?.(null, files);

    currentFiles.forEach((file) => {
      const fullPath = join(dirPath, file);

      fsStat(fullPath, (err, stat) => {
        /* c8 ignore start */
        if (err) {
          if (!--pending) callback?.(null, files);
          return;
        }
        /* c8 ignore stop */

        if (
          fullPath.indexOf('node_modules') !== -1 ||
          fullPath.indexOf('.git') === 0
        ) {
          /* c8 ignore start */
          if (!--pending) callback?.(null, files);
          return;
          /* c8 ignore stop */
        }

        if (exclude) {
          for (let i = 0; i < exclude.length; i++) {
            if (exclude[i].test(fullPath)) {
              /* c8 ignore start */
              if (!--pending) callback?.(null, files);
              return;
              /* c8 ignore stop */
            }
          }
        }

        if (filter.test(fullPath)) {
          files.push(fullPath);

          /* c8 ignore start */
          if (!--pending) callback?.(null, files);
          return;
          /* c8 ignore stop */
        }

        if (stat.isDirectory()) {
          getAllFiles(fullPath, files, configs, (err) => {
            /* c8 ignore start */
            if (err) {
              if (!--pending) callback?.(err, files);
              return;
            }
            /* c8 ignore stop */

            if (!--pending) callback?.(null, files);
          });
          /* c8 ignore next */
        } else if (!--pending) callback?.(null, files);
      });
    });
  });
};

export const listFiles = (
  targetDir: string,
  configs?: Configs
): Promise<string[]> =>
  new Promise((resolve, reject) => {
    getAllFiles(sanitizePath(targetDir), [], configs, (err, result) => {
      if (err) return reject(err);

      resolve(result!);
    });
  });
