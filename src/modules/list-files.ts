/* c8 ignore next */
import type { Configs } from '../@types/list-files.js';
import { env } from 'node:process';
import { sep, join } from 'node:path';
import { readdir, stat as fsStat } from '../polyfills/fs.js';

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
    .replace(regex.sep, sep) // adapting slashes according to OS
    .replace(regex.pathLevel, '') // ensure the current path level
    .replace(regex.unusualChars, ''); // removing unusual path characters

  // Preventing absolute path access
  return ensureTarget
    ? sanitizedPath.replace(regex.absolutePath, `.${sep}`)
    : sanitizedPath;
};

/* c8 ignore start */
export const isFile = async (fullPath: string) =>
  (await fsStat(fullPath)).isFile();
/* c8 ignore stop */

/* c8 ignore start */
export const escapeRegExp = (string: string) =>
  string.replace(regex.safeRegExp, '\\$&');
/* c8 ignore stop */

/* c8 ignore start */
const envFilter = env.FILTER?.trim()
  ? new RegExp(escapeRegExp(env.FILTER), 'i')
  : undefined;
/* c8 ignore stop */

export const getAllFiles = async (
  dirPath: string,
  files: Set<string> = new Set(),
  configs?: Configs
): Promise<Set<string>> => {
  const currentFiles = await readdir(sanitizePath(dirPath));
  /* c8 ignore start */
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
  /* c8 ignore stop */

  await Promise.all(
    currentFiles.map(async (file) => {
      const fullPath = join(dirPath, file);
      const stat = await fsStat(fullPath);

      /* c8 ignore start */
      if (
        fullPath.indexOf('node_modules') !== -1 ||
        fullPath.indexOf('.git') === 0
      ) {
        return;
      }
      /* c8 ignore stop */

      if (exclude) {
        for (let i = 0; i < exclude.length; i++) {
          /* c8 ignore next */
          if (exclude[i].test(fullPath)) {
            return;
          }
        }
      }

      if (filter.test(fullPath)) {
        return files.add(fullPath);
      }

      if (stat.isDirectory()) {
        await getAllFiles(fullPath, files, configs);
      }
    })
  );

  return files;
};

/* c8 ignore start */ // c8 bug
export const listFiles = async (
  targetDir: string,
  configs?: Configs
): Promise<string[]> =>
  Array.from(await getAllFiles(sanitizePath(targetDir), new Set(), configs));
/* c8 ignore stop */
