/* c8 ignore start */ // This method will be removed in a future release to use `list-files.ts` instead
import { env } from 'node:process';
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import type { Configs } from '../@types/list-files.js';
import { escapeRegExp, sanitizePath } from './list-files.js';

const isDir = (fullPath: string) => statSync(fullPath).isDirectory();

const regex = {
  defaultFilter: /\.(test|spec)\./i,
  staticExclude: /node_modules|^.git/,
};

const envFilter = env.FILTER?.trim()
  ? new RegExp(escapeRegExp(env.FILTER), 'i')
  : null;

const listFiles = (
  dirPath: string,
  files: string[] = [],
  configs?: Configs
) => {
  const currentFiles = readdirSync(sanitizePath(dirPath));
  const filter: RegExp =
    (envFilter
      ? envFilter
      : configs?.filter instanceof RegExp
        ? configs.filter
        : regex.defaultFilter) || regex.defaultFilter;

  const exclude: Configs['exclude'] = configs?.exclude
    ? Array.isArray(configs.exclude)
      ? configs.exclude
      : [configs.exclude]
    : undefined;

  for (const file of currentFiles) {
    const fullPath = sanitizePath(path.join(dirPath, file));

    if (regex.staticExclude.test(fullPath)) {
      continue;
    }
    if (exclude?.some((regex) => regex.test(fullPath))) {
      continue;
    }

    if (isDir(fullPath)) {
      listFiles(fullPath, files, configs);
    } else if (filter.test(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
};

export const publicListFiles = (targetDir: string, configs?: Configs) =>
  listFiles(sanitizePath(targetDir), [], configs);
/* c8 ignore stop */
