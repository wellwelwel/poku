import fs from 'fs';
import path from 'path';
import { filter as envFilter } from './filter.js';
import { Configs } from '../@types/poku.js';

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
