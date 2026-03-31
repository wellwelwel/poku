import { stat } from 'node:fs/promises';
import { argv, exit } from 'node:process';
import { GLOBAL } from '../configs/poku.js';
import { getArg, hasArg } from '../parsers/get-arg.js';
import { format } from './format.js';
import { reporter } from './reporter.js';
import { hr, log } from './write.js';

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

const checkFlags = (): void => {
  const allowedFlags = new Set([
    '--concurrency',
    '--config',
    '--debug',
    '--denoAllow',
    '--denoDeny',
    '--enforce',
    '--envFile',
    '--exclude',
    '--failFast',
    '--filter',
    '--isolation',
    '--killPid',
    '--killPort',
    '--killRange',
    '--only',
    '--quiet',
    '--reporter',
    '--sequential',
    '--timeout',
    '--watch',
    '--watchInterval',
    '-c',
    '-d',
    '-q',
    '-r',
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

const checkValues = async (): Promise<void> => {
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
    'isolation',
    'killPid',
    'killPort',
    'reporter',
    'timeout',
    'watchInterval',
    'c',
    'r',
  ])
    checkRequiredValue(flag);

  if (GLOBAL.configFile) await pathExists('config', GLOBAL.configFile);
  if (GLOBAL.envFile) await pathExists('envFile', GLOBAL.envFile);

  if (
    getArg('concurrency') &&
    typeof GLOBAL.configs.concurrency === 'undefined'
  )
    errors.push('--concurrency: expects for a valid integer.');

  if (getArg('timeout') && typeof GLOBAL.configs.timeout === 'undefined')
    errors.push('--timeout: expects for a valid integer.');

  const isolationValue = getArg('isolation');
  if (
    isolationValue &&
    isolationValue !== 'none' &&
    isolationValue !== 'process'
  )
    errors.push(
      `--isolation: "${isolationValue}" is not valid. Available: none, process.`
    );

  const reporterValue = getArg('reporter') ?? getArg('r', '-');
  if (reporterValue && !(reporterValue in reporter))
    errors.push(
      `--reporter: "${reporterValue}" is not a valid reporter. Available: ${Object.keys(reporter).join(', ')}.`
    );
};

const checkConfigFile = (): void => {
  const allowedProps = new Set([
    '$schema',
    'include',
    'sequential',
    'debug',
    'filter',
    'exclude',
    'failFast',
    'envFile',
    'exclude',
    'failFast',
    'concurrency',
    'quiet',
    'timeout',
    'envFile',
    'kill',
    'isolation',
    'platform',
    'deno',
  ]);

  for (const prop in GLOBAL.configsFromFile) {
    if (!allowedProps.has(prop))
      errors.push(`${prop}: unrecognized property in the config file.`);
  }
};

export const enforce = async (): Promise<void> => {
  checkFlags();
  checkConfigFile();
  await checkValues();

  if (errors.length > 0) {
    hr();
    log(`${format('Ensure Enabled').bold()}\n`);
    log(errors.map((flag) => format(flag).fail()).join('\n'));
    hr();
    exit(1);
  }
};
