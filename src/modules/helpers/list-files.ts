import type { Configs } from '../../@types/list-files.js';
import { readdirSync, statSync } from 'node:fs';
import { stat as fsStat } from 'node:fs/promises';
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

export const getAllFiles = (
  dirPath: string,
  files: Set<string> = new Set(),
  configs?: Configs
): Set<string> => {
  const filter: RegExp =
    envFilter ??
    (configs?.filter instanceof RegExp ? configs.filter : regex.defaultFilter);

  const exclude: RegExp[] | undefined = configs?.exclude
    ? Array.isArray(configs.exclude)
      ? configs.exclude
      : [configs.exclude]
    : undefined;

  const sanitized = sanitizePath(dirPath);

  try {
    const stat = statSync(sanitized);

    if (stat.isFile()) {
      const fullPath = sanitized;

      if (
        fullPath.indexOf('node_modules') !== -1 ||
        fullPath.indexOf('.git/') !== -1
      )
        return files;

      if (states?.isSinglePath) {
        files.add(fullPath);
        return files;
      }

      if (exclude)
        for (const pattern of exclude) if (pattern.test(fullPath)) return files;

      if (filter.test(fullPath)) files.add(fullPath);
      return files;
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  const entries = readdirSync(sanitized, {
    withFileTypes: true,
    recursive: true,
  });

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const parentPath =
      'parentPath' in entry
        ? (entry.parentPath as string)
        : (entry as { path?: string }).path ?? sanitized;
    const fullPath = join(parentPath, entry.name);

    if (
      fullPath.indexOf('node_modules') !== -1 ||
      fullPath.indexOf('.git/') !== -1
    )
      continue;

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
};

export const listFiles = (
  targetDir: string,
  configs?: Configs
): string[] =>
  Array.from(getAllFiles(sanitizePath(targetDir), new Set(), configs));
