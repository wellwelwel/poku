import { argv, exit } from 'node:process';
import { stat } from 'node:fs/promises';
import { log, hr } from './write.js';
import { format } from './format.js';
import { GLOBAL } from '../configs/poku.js';
import { getArg, hasArg } from '../parsers/get-arg.js';

const unrecognizedFlags: string[] = [];
const unrecognizedValues: string[] = [];

const printErrors = (type: 'flags' | 'values', errorList: string[]) => {
  log(
    `${format(`Unrecognized ${type}:`).bold()}\n\n${errorList.map((flag) => format(flag).fail()).join('\n')}`
  );
};

const pathExists = async (arg: string, path: string): Promise<void> => {
  try {
    await stat(path);
  } catch {
    unrecognizedValues.push(`--${arg}: ./${path} doesn't exists.`);
  }
};

const checkUselessValue = (arg: string): void => {
  const prefix = arg.length === 1 ? '-' : '--';

  if (typeof getArg(arg, prefix) !== 'undefined')
    unrecognizedValues.push(
      `${prefix}${arg}: this flag shouldn't receive a value.`
    );
};

const checkRequiredValue = (arg: string): void => {
  const prefix = arg.length === 1 ? '-' : '--';

  if (hasArg(arg, prefix) && typeof getArg(arg, prefix) === 'undefined')
    unrecognizedValues.push(`${prefix}${arg}: this flag require a value.`);
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
    const flagName = arg.split('=')[0];

    if (!allowedFlags.has(flagName) && flagName.startsWith('-'))
      unrecognizedFlags.push(flagName);
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
  else if (hasArg('envFile') && !getArg('envFile'))
    await pathExists('envFile', '.env');

  if (
    getArg('concurrency') &&
    typeof GLOBAL.options.concurrency === 'undefined'
  )
    unrecognizedValues.push('--concurrency: expects for a valid integer.');
};

export const enforce = async () => {
  checkFlags();
  await checkValues();

  if (unrecognizedFlags.length > 0) {
    hr();
    printErrors('flags', unrecognizedFlags);
    if (unrecognizedValues.length === 0) hr();
  }

  if (unrecognizedValues.length > 0) {
    hr();
    printErrors('values', unrecognizedValues);
    hr();
  }

  if (unrecognizedFlags.length > 0 || unrecognizedValues.length > 0) exit(1);
};
