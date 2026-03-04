import type { Configs } from '../../@types/list-files.js';
import { stat as fsStat, readdir } from 'node:fs/promises';
import { join, sep } from 'node:path';
import { env } from 'node:process';
import { states } from '../../configs/poku.js';

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

const getAllFilesInner = async (
  dirPath: string,
  files: Set<string>,
  filter: RegExp,
  exclude: RegExp[] | undefined
): Promise<Set<string>> => {
  let isFullPath = false;

  const currentFiles = await (async () => {
    try {
      if (await isFile(dirPath)) {
        isFullPath = true;
        return [sanitizePath(dirPath)];
      }

      return readdir(sanitizePath(dirPath));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
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

      if (stat.isDirectory())
        await getAllFilesInner(fullPath, files, filter, exclude);
    })
  );

  return files;
};

export const getAllFiles = (
  dirPath: string,
  files: Set<string> = new Set(),
  configs?: Configs
): Promise<Set<string>> => {
  const filter: RegExp =
    envFilter ??
    (configs?.filter instanceof RegExp ? configs.filter : regex.defaultFilter);

  const exclude: RegExp[] | undefined = configs?.exclude
    ? Array.isArray(configs.exclude)
      ? configs.exclude
      : [configs.exclude]
    : undefined;

  return getAllFilesInner(dirPath, files, filter, exclude);
};

export const listFiles = async (
  targetDir: string,
  configs?: Configs
): Promise<string[]> =>
  Array.from(await getAllFiles(sanitizePath(targetDir), new Set(), configs));
