/* c8 ignore next */
import process from 'node:process';
import { sep, join } from 'node:path';
import { readdir, stat as fsStat } from '../polyfills/fs.js';
/* c8 ignore next */
import type { Configs } from '../@types/list-files.js';

export const sanitizePath = (input: string, ensureTarget?: boolean): string => {
  const sanitizedPath = input
    .replace(/[/\\]+/g, sep) // adapting slashes according to OS
    .replace(/(\.\.(\/|\\|$))+/g, '') // ensure the current path level
    .replace(/[<>|^?*]+/g, ''); // removing unusual path characters

  // Preventing absolute path access
  return ensureTarget
    ? sanitizedPath.replace(/^[/\\]/, `.${sep}`)
    : sanitizedPath;
};

/* c8 ignore start */
export const isFile = async (fullPath: string) =>
  (await fsStat(fullPath)).isFile();
/* c8 ignore stop */

/* c8 ignore start */
export const escapeRegExp = (string: string) =>
  string.replace(/[.*{}[\]\\]/g, '\\$&');
/* c8 ignore stop */

/* c8 ignore start */
const envFilter = process.env.FILTER?.trim()
  ? new RegExp(escapeRegExp(process.env.FILTER), 'i')
  : undefined;
/* c8 ignore stop */

export const getAllFiles = async (
  dirPath: string,
  files: Set<string> = new Set(),
  configs?: Configs
): Promise<Set<string>> => {
  const currentFiles = await readdir(sanitizePath(dirPath));
  const defaultRegExp = /\.(test|spec)\./i;
  /* c8 ignore start */
  const filter: RegExp =
    (envFilter
      ? envFilter
      : configs?.filter instanceof RegExp
        ? configs.filter
        : defaultRegExp) || defaultRegExp;

  const exclude: Configs['exclude'] = configs?.exclude
    ? Array.isArray(configs.exclude)
      ? configs.exclude
      : [configs.exclude]
    : undefined;
  /* c8 ignore stop */

  await Promise.all(
    currentFiles.map(async (file) => {
      const fullPath = join(dirPath, file);
      const stat = await fsStat(fullPath);

      /* c8 ignore start */
      if (
        fullPath.indexOf('node_modules') !== -1 ||
        fullPath.indexOf('.git') === 0
      )
        return;
      /* c8 ignore stop */

      if (exclude) {
        for (let i = 0; i < exclude.length; i++) {
          /* c8 ignore next */
          if (exclude[i].test(fullPath)) return;
        }
      }

      if (filter.test(fullPath)) return files.add(fullPath);
      if (stat.isDirectory()) await getAllFiles(fullPath, files, configs);
    })
  );

  return files;
};

/* c8 ignore start */
export const listFiles = async (
  targetDir: string,
  configs?: Configs
): Promise<string[]> =>
  Array.from(await getAllFiles(sanitizePath(targetDir), new Set(), configs));
/* c8 ignore stop */
