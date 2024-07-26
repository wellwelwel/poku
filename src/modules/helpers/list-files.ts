import type { Configs } from '../../@types/list-files.js';
import { env } from 'node:process';
import { sep, join } from 'node:path';
import { readdir, stat as fsStat } from '../../polyfills/fs.js';

const regex = {
  sep: /[/\\]+/g,
  pathLevel: /(\.\.(\/|\\|$))+/g,
  unusualChars: /[<>|^?*]+/g,
  absolutePath: /^[/\\]/,
  safeRegExp: /[.*{}[\]\\]/g,
  defaultFilter: /\.(test|spec)\./i,
} as const;

export const sanitizePath = (input: string, ensureTarget?: boolean): string => {
  const sanitizedPath = input
    .replace(regex.sep, sep)
    .replace(regex.pathLevel, '')
    .replace(regex.unusualChars, '');

  return ensureTarget
    ? sanitizedPath.replace(regex.absolutePath, `.${sep}`)
    : sanitizedPath;
};

export const isFile = async (fullPath: string) =>
  (await fsStat(fullPath)).isFile();

export const escapeRegExp = (string: string) =>
  string.replace(regex.safeRegExp, '\\$&');

const envFilter = env.FILTER?.trim()
  ? new RegExp(escapeRegExp(env.FILTER), 'i')
  : undefined;

export const getAllFiles = async (
  dirPath: string,
  files: Set<string> = new Set(),
  configs?: Configs
): Promise<Set<string>> => {
  const currentFiles = await readdir(sanitizePath(dirPath));

  const filter: RegExp = envFilter
    ? envFilter
    : configs?.filter instanceof RegExp
      ? configs.filter
      : regex.defaultFilter;

  const exclude: Configs['exclude'] = configs?.exclude
    ? Array.isArray(configs.exclude)
      ? configs.exclude
      : [configs.exclude]
    : undefined;

  await Promise.all(
    currentFiles.map(async (file) => {
      const fullPath = join(dirPath, file);
      const stat = await fsStat(fullPath);

      /* c8 ignore next 6 */
      if (
        fullPath.indexOf('node_modules') !== -1 ||
        fullPath.indexOf('.git') === 0
      ) {
        return;
      }

      if (exclude) {
        for (const pattern of exclude) {
          if (pattern.test(fullPath)) {
            return;
          }
        }
      }

      if (filter.test(fullPath)) {
        return files.add(fullPath);
      }

      if (stat.isDirectory()) {
        await getAllFiles(fullPath, files, configs);
      }
    })
  );

  return files;
};

export const listFiles = async (
  targetDir: string,
  configs?: Configs
): Promise<string[]> =>
  Array.from(await getAllFiles(sanitizePath(targetDir), new Set(), configs));
