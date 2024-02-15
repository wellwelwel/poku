import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import type { Configs } from '../@types/poku.ts';

export const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const envFilter = process.env.FILTER?.trim()
  ? new RegExp(escapeRegExp(process.env.FILTER), 'i')
  : null;

export const getFiles = (
  dirPath: string,
  files: string[] = [],
  configs?: Configs
) => {
  const currentFiles = fs.readdirSync(dirPath);
  const filter: RegExp =
    (envFilter ? envFilter : configs?.filter) || /\.test\./i;

  for (const file of currentFiles) {
    const fullPath = path.join(dirPath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files, configs);
    } else if (filter.test(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
};
