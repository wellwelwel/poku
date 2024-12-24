import { version } from 'node:process';
import { GLOBAL } from '../configs/poku.js';

const regex = /v(\d+)\./;

export const nodeVersion =
  GLOBAL.runtime === 'node' ? Number(version.match(regex)?.[1]) : undefined;
