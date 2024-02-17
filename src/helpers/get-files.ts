import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import type { Configs } from '../@types/poku.ts';

export const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()[\]\\]/g, '\\$&');

export const envFilter = process.env.FILTER?.trim()
  ? new RegExp(escapeRegExp(process.env.FILTER), 'i')
  : null;

export const getFiles = (
  dirPath: string,
  files: string[] = [],
  configs?: Configs
) => {
  const currentFiles = fs.readdirSync(dirPath);
  const defaultRegExp = /\.test\./i;
  const filter: RegExp =
    (envFilter
      ? envFilter
      : configs?.filter instanceof RegExp
        ? configs.filter
        : defaultRegExp) || defaultRegExp;
  const exclude: RegExp | undefined =
    configs?.exclude instanceof RegExp ? configs?.exclude : undefined;

  for (const file of currentFiles) {
    const fullPath = path.join(dirPath, file);

    if (exclude && exclude.test(fullPath)) continue;

    if (fs.statSync(fullPath).isDirectory()) getFiles(fullPath, files, configs);
    else if (filter.test(fullPath)) files.push(fullPath);
  }

  return files;
};
