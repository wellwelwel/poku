/* c8 ignore start */

import {
  stat as nodeStat,
  readdir as nodeReaddir,
  readFile as nodeReadFile,
  type Dirent,
  type Stats,
} from 'node:fs';

export const readdir = (
  path: string,
  options: { withFileTypes: true }
): Promise<Dirent[]> =>
  new Promise((resolve, reject) => {
    nodeReaddir(path, options, (err, entries) => {
      if (err) reject(err);
      else resolve(entries);
    });
  });

export const stat = (path: string): Promise<Stats> => {
  return new Promise((resolve, reject) => {
    nodeStat(path, (err, stats) => {
      if (err) reject(err);
      else resolve(stats);
    });
  });
};

export const readFile = (
  path: string,
  encoding: BufferEncoding = 'utf-8'
): Promise<string> =>
  new Promise((resolve, reject) => {
    nodeReadFile(path, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

/* c8 ignore stop */
