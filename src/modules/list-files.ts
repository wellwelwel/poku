import process from 'node:process';
import { readdir, stat as fsStat } from 'node:fs/promises';
import { sep, join } from 'node:path';
/* c8 ignore next */
import type { Configs } from '../@types/list-files.js';

export const sanitizePath = (input: string, ensureTarget?: boolean): string => {
  const sanitizedPath = input
    .replace(/[/\\]+/g, sep) // adapting slashes according to OS
    .replace(/(\.\.(\/|\\|$))+/g, '') // ensure the current path level
    .replace(/[<>|^?*]+/g, ''); // removing unusual path characters

  // Preventing absolute path access
  return ensureTarget ? sanitizedPath.replace(/^[/\\]/, './') : sanitizedPath;
};

export const isFile = async (fullPath: string) =>
  (await fsStat(fullPath)).isFile();

export const escapeRegExp = (string: string) =>
  string.replace(/[.*{}[\]\\]/g, '\\$&');

const envFilter = process.env.FILTER?.trim()
  ? new RegExp(escapeRegExp(process.env.FILTER), 'i')
  : undefined;

export const getAllFiles = async (
  dirPath: string,
  files: string[] = [],
  configs?: Configs
): Promise<string[]> => {
  const currentFiles = await readdir(sanitizePath(dirPath));
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

  await Promise.all(
    currentFiles.map(async (file) => {
      const fullPath = join(dirPath, file);
      const stat = await fsStat(fullPath);

      if (
        fullPath.indexOf('node_modules') !== -1 ||
        fullPath.indexOf('.git') === 0
      )
        return;

      if (exclude) {
        for (let i = 0; i < exclude.length; i++) {
          if (exclude[i].test(fullPath)) return;
        }
      }

      if (filter.test(fullPath)) return files.push(fullPath);
      if (stat.isDirectory()) await getAllFiles(fullPath, files, configs);
    })
  );

  return files;
};

export const listFiles = async (targetDir: string, configs?: Configs) =>
  await getAllFiles(sanitizePath(targetDir), [], configs);
