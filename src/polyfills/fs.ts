import {
  stat as nodeStat,
  readdir as nodeReaddir,
  readFile as nodeReadFile,
  type Dirent,
  type Stats,
} from 'node:fs';

export function readdir(path: string): Promise<string[]>;
export function readdir(
  path: string,
  options: { withFileTypes: true }
): Promise<Dirent[]>;
export function readdir(
  path: string,
  options?: { withFileTypes?: boolean }
): Promise<string[] | Dirent[]> {
  return new Promise((resolve, reject) => {
    if (options?.withFileTypes) {
      nodeReaddir(path, { withFileTypes: true }, (err, entries) => {
        if (err) {
          return reject(err);
        }

        resolve(entries);
      });

      return;
    }

    nodeReaddir(path, (err, files) => {
      if (err) {
        return reject(err);
      }

      resolve(files);
    });
  });
}

export const stat = (path: string): Promise<Stats> => {
  return new Promise((resolve, reject) => {
    nodeStat(path, (err, stats) => {
      if (err) {
        return reject(err);
      }

      resolve(stats);
    });
  });
};

export const readFile = (
  path: string,
  encoding: BufferEncoding = 'utf-8'
): Promise<string> =>
  new Promise((resolve, reject) => {
    nodeReadFile(path, encoding, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
