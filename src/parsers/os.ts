import { platform } from 'node:process';

export const isWindows = platform === 'win32';
