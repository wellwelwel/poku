import type { Configs } from '../../@types/list-files.js';
import { readdirSync, statSync } from 'node:fs';
import { join, sep } from 'node:path';
import { env, exit } from 'node:process';
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

export const escapeRegExp = (string: string) =>
  string.replace(regex.safeRegExp, '\\$&');

const envFilter = env.FILTER?.trim()
  ? new RegExp(escapeRegExp(env.FILTER), 'i')
  : undefined;

const getAllFiles = (
  dirPath: string,
  files: Set<string> = new Set(),
  configs?: Configs
): Set<string> => {
  let isFullPath = false;

  const currentFiles = (() => {
    try {
      if (statSync(dirPath).isFile()) {
        isFullPath = true;
        return [sanitizePath(dirPath)];
      }

      return readdirSync(sanitizePath(dirPath));
    } catch (error) {
      console.error(error);
      exit(1);
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

  fileLoop: for (const file of currentFiles) {
    const fullPath = isFullPath ? dirPath : join(dirPath, file);

    if (
      fullPath.indexOf('node_modules') !== -1 ||
      fullPath.indexOf('.git/') !== -1
    )
      continue;

    if (isFullPath && states?.isSinglePath) {
      files.add(fullPath);
      continue;
    }

    if (exclude)
      for (const pattern of exclude)
        if (pattern.test(fullPath)) continue fileLoop;

    if (filter.test(fullPath)) {
      files.add(fullPath);
      continue;
    }

    const stat = statSync(fullPath);
    if (stat.isDirectory()) getAllFiles(fullPath, files, configs);
  }

  return files;
};

export const listFiles = (targetDir: string, configs?: Configs): string[] =>
  Array.from(getAllFiles(sanitizePath(targetDir), new Set(), configs));
