import { argv } from 'node:process';

const [, , ...processArgs] = argv;
const regexQuotes = /''|""/;

export const getArg = (
  arg: string,
  prefix = '--',
  baseArgs = processArgs
): string | undefined => {
  const argPattern = `${prefix}${arg}=`;
  const argValue = baseArgs.find((a) => a.startsWith(argPattern));

  if (!argValue) return;

  return argValue.slice(argPattern.length).replace(regexQuotes, '');
};

export const hasArg = (
  arg: string,
  prefix = '--',
  baseArgs = processArgs
): boolean => baseArgs.some((a) => a.startsWith(`${prefix}${arg}`));

export const getPaths = (
  prefix = '--',
  baseArgs = processArgs
): string[] | undefined => {
  let hasPaths = false;
  const paths: string[] = [];

  for (const arg of baseArgs) {
    if (arg.startsWith(prefix)) continue;
    if (!hasPaths) hasPaths = true;

    paths.push(arg);
  }

  return hasPaths ? paths : undefined;
};

export const argToArray = (
  arg: string,
  prefix = '--',
  baseArgs = processArgs
): string[] | undefined => {
  const hasArgument = hasArg(arg, prefix, baseArgs);
  if (!hasArgument) return;

  const argValue = getArg(arg, prefix, baseArgs);
  if (!argValue) return [];

  return argValue.split(',').filter((a) => a);
};

export const hasOnly = hasArg('only');
