import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
/* c8 ignore next */
import type { Configs } from '../@types/list-files.js';

export const sanitizePath = (input: string, ensureTarget?: boolean): string => {
  const sanitizedPath = input
    .replace(/[/\\]+/g, path.sep) // adapting slashes according to OS
    .replace(/(\.\.(\/|\\|$))+/g, '') // ensure the current path level
    .replace(/[<>|^?*]+/g, ''); // removing unusual path characters

  // Preventing absolute path access
  return ensureTarget ? sanitizedPath.replace(/^[/\\]/, './') : sanitizedPath;
};

export const escapeRegExp = (string: string) =>
  string.replace(/[.*{}[\]\\]/g, '\\$&');

export const isFile = (fullPath: string) => fs.statSync(fullPath).isFile();

export const isDir = (fullPath: string) => fs.statSync(fullPath).isDirectory();

const envFilter = process.env.FILTER?.trim()
  ? new RegExp(escapeRegExp(process.env.FILTER), 'i')
  : null;

export const listFiles = (
  dirPath: string,
  files: string[] = [],
  configs?: Configs
) => {
  const currentFiles = fs.readdirSync(sanitizePath(dirPath));
  const defaultRegExp = /\.(test|spec)\./i;
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

  for (const file of currentFiles) {
    const fullPath = sanitizePath(path.join(dirPath, file));

    if (/node_modules/.test(fullPath)) continue;
    if (exclude && exclude.some((regex) => regex.test(fullPath))) continue;

    if (isDir(fullPath)) listFiles(fullPath, files, configs);
    else if (filter.test(fullPath)) files.push(fullPath);
  }

  return files;
};

export const publicListFiles = (targetDir: string, configs?: Configs) =>
  listFiles(sanitizePath(targetDir), [], configs);
