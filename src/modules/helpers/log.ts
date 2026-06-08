import { serialize } from '../../parsers/output.js';
import { log as writeLog } from '../../services/write.js';

export const log = (...args: unknown[]) => {
  const parsedMessages = args
    .map((arg) => serialize(arg))
    .join(' ')
    .split('\n')
    .map((line) => `\x1b[0m${line}\x1b[0m`)
    .join('\n');

  writeLog(parsedMessages);
};
