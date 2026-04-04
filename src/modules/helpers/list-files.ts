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
  try {
    const sanitized = sanitizePath(dirPath);
    const stat = await fsStat(sanitized);

    if (stat.isFile()) {
      if (
        sanitized.indexOf('node_modules') !== -1 ||
        sanitized.indexOf('.git/') !== -1
      )
        return files;

      if (states?.isSinglePath) {
        files.add(sanitized);
        return files;
      }

      if (exclude)
        for (const pattern of exclude)
          if (pattern.test(sanitized)) return files;

      if (filter.test(sanitized)) files.add(sanitized);

      return files;
    }

    const entries = await readdir(sanitized, { recursive: true });

    for (const entry of entries) {
      if (entry.includes('node_modules') || entry.includes('.git')) continue;

      const fullPath = join(dirPath, entry);

      if (exclude) {
        let excluded = false;
        for (const pattern of exclude) {
          if (pattern.test(fullPath)) {
            excluded = true;
            break;
          }
        }
        if (excluded) continue;
      }

      if (filter.test(fullPath)) files.add(fullPath);
    }

    return files;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
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
