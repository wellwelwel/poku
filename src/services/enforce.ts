import { argv, exit } from 'node:process';
import { stat } from 'node:fs/promises';
import { log, hr } from './write.js';
import { format } from './format.js';
import { GLOBAL } from '../configs/poku.js';
import { getArg, hasArg } from '../parsers/get-arg.js';

const errors: string[] = [];

const pathExists = async (arg: string, path: string): Promise<void> => {
  try {
    await stat(path);
  } catch {
    errors.push(`--${arg}: ./${path} doesn't exists.`);
  }
};

const checkUselessValue = (arg: string): void => {
  const prefix = arg.length === 1 ? '-' : '--';

  if (typeof getArg(arg, prefix) !== 'undefined')
    errors.push(`${prefix}${arg}: this flag shouldn't receive a value.`);
};

const checkRequiredValue = (arg: string): void => {
  const prefix = arg.length === 1 ? '-' : '--';

  if (hasArg(arg, prefix) && typeof getArg(arg, prefix) === 'undefined')
    errors.push(`${prefix}${arg}: this flag require a value.`);
};

const checkFlags = () => {
  const allowedFlags = new Set([
    '--concurrency',
    '--config',
    '--debug',
    '--denoAllow',
    '--denoCjs',
    '--denoDeny',
    '--enforce',
    '--envFile',
    '--exclude',
    '--failFast',
    '--filter',
    '--killPid',
    '--killPort',
    '--killRange',
    '--only',
    '--quiet',
    '--sequential',
    '--watch',
    '--watchInterval',
    '-c',
    '-d',
    '-q',
    '-w',
    '-x',
  ]);

  const args = argv.slice(2);

  for (const arg of args) {
    const flag = arg.split('=')[0];

    if (!allowedFlags.has(flag) && flag.startsWith('-'))
      errors.push(`${flag}: unrecognized flag.`);
  }
};

const checkValues = async () => {
  for (const flag of [
    'debug',
    'enforce',
    'failFast',
    'only',
    'quiet',
    'sequential',
    'watch',
    'd',
    'x',
    'q',
    'w',
  ])
    checkUselessValue(flag);

  for (const flag of [
    'concurrency',
    'config',
    'killPid',
    'killPort',
    'watchInterval',
    'c',
  ])
    checkRequiredValue(flag);

  if (GLOBAL.configFile) await pathExists('config', GLOBAL.configFile);
  if (GLOBAL.envFile) await pathExists('envFile', GLOBAL.envFile);

  if (
    getArg('concurrency') &&
    typeof GLOBAL.options.concurrency === 'undefined'
  )
    errors.push('--concurrency: expects for a valid integer.');
};

export const enforce = async () => {
  checkFlags();
  await checkValues();

  if (errors.length > 0) {
    hr();
    log(`${format('Ensure Enabled').bold()}\n`);
    log(errors.map((flag) => format(flag).fail()).join('\n'));
    hr();
    exit(1);
  }
};
