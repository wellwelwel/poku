import type { Configs } from '../../@types/list-files.js';
import { env } from 'node:process';
import { sep, join } from 'node:path';
import { readdir, stat as fsStat } from 'node:fs/promises';
import { states } from '../../configs/files.js';

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

export const isDir = async (fullPath: string) =>
  (await fsStat(fullPath)).isDirectory();

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
  let isFullPath = false;

  const currentFiles = await (async () => {
    try {
      if (await isFile(dirPath)) {
        isFullPath = true;
        return [sanitizePath(dirPath)];
      }

      return await readdir(sanitizePath(dirPath));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })();

  const filter: RegExp = (() => {
    if (envFilter) return envFilter;
    if (configs?.filter instanceof RegExp) return configs.filter;
    return regex.defaultFilter;
  })();

  const exclude: Configs['exclude'] = (() => {
    if (!configs?.exclude) return undefined;
    if (Array.isArray(configs.exclude)) return configs.exclude;
    return [configs.exclude];
  })();

  await Promise.all(
    currentFiles.map(async (file) => {
      const fullPath = isFullPath ? dirPath : join(dirPath, file);
      const stat = await fsStat(fullPath);

      if (
        fullPath.indexOf('node_modules') !== -1 ||
        fullPath.indexOf('.git/') !== -1
      )
        return;

      if (isFullPath && states?.isSinglePath) return files.add(fullPath);

      if (exclude)
        for (const pattern of exclude) {
          if (pattern.test(fullPath)) return;
        }

      if (filter.test(fullPath)) return files.add(fullPath);

      if (stat.isDirectory()) await getAllFiles(fullPath, files, configs);
    })
  );

  return files;
};

export const listFiles = async (
  targetDir: string,
  configs?: Configs
): Promise<string[]> =>
  Array.from(await getAllFiles(sanitizePath(targetDir), new Set(), configs));
