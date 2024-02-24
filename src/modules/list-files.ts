import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import type { Configs } from '../@types/list-files.js';

export const escapeRegExp = (string: string) =>
  string.replace(/[.*{}[\]\\]/g, '\\$&');

const envFilter = process.env.FILTER?.trim()
  ? new RegExp(escapeRegExp(process.env.FILTER), 'i')
  : null;

export const listFiles = (
  dirPath: string,
  files: string[] = [],
  configs?: Configs
) => {
  const currentFiles = fs.readdirSync(dirPath);
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
    const fullPath = path.join(dirPath, file);

    if (exclude && exclude.some((regex) => regex.test(fullPath))) continue;

    if (fs.statSync(fullPath).isDirectory())
      listFiles(fullPath, files, configs);
    else if (filter.test(fullPath)) files.push(fullPath);
  }

  return files;
};

export const publicListFiles = (targetDir: string, configs?: Configs) =>
  listFiles(targetDir, [], configs);
