import { env as processEnv } from 'node:process';
import { readFile } from '../../polyfills/fs.js';
import { sanitizePath } from './list-files.js';
import {
  parseEnvLine,
  removeComments,
  resolveEnvVariables,
} from '../../services/env.js';

const regex = {
  comment: /^\s*#/,
};

/** Reads an environment file and sets the environment variables. */
export const envFile = async (filePath = '.env') => {
  const mapEnv = new Map<string, string>();
  const env = await readFile(sanitizePath(filePath), 'utf8');
  const lines = env
    .split('\n')
    .map((line) => removeComments(line.trim()))
    .filter((line) => line.length > 0 && !regex.comment.test(line));

  for (const line of lines) {
    const parsedLine = parseEnvLine(line);

    if (parsedLine) {
      const { arg, value } = parsedLine;

      mapEnv.set(arg, value ? resolveEnvVariables(value, processEnv) : value);
    }
  }

  for (const [arg, value] of mapEnv) processEnv[arg] = value;
};
