import { cwd } from 'node:process';

export const results = {
  success: 0,
  fail: 0,
  skip: 0,
  todo: 0,
};

export const VERSION = '';

export const deepOptions: string[] = [];

export const GLOBAL = {
  cwd: cwd(),
  runAsOnly: false,
};
