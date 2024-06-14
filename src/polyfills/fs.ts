/* c8 ignore start */

import {
  stat as nodeStat,
  readdir as nodeReaddir,
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

/* c8 ignore stop */
