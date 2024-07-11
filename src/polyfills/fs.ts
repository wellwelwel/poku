import {
  stat as nodeStat,
  readdir as nodeReaddir,
  readFile as nodeReadFile,
} from 'node:fs';
import { promisify } from 'node:util';

export const readdir = promisify(nodeReaddir);
export const stat = promisify(nodeStat);
export const readFile = promisify(nodeReadFile);
