import { argv } from 'node:process';

const [, , ...processArgs] = argv;
const regexQuotes = /''|""/;

export const getArg = (
  arg: string,
  prefix = '--',
  baseArgs = processArgs
): string | undefined => {
  const argPattern = `${prefix}${arg}=`;
  const patternLen = argPattern.length;

  for (let i = 0; i < baseArgs.length; i++) {
    if (baseArgs[i].startsWith(argPattern))
      return baseArgs[i].slice(patternLen).replace(regexQuotes, '');
  }
};

export const hasArg = (
  arg: string,
  prefix = '--',
  baseArgs = processArgs
): boolean => {
  const pattern = `${prefix}${arg}`;

  for (let i = 0; i < baseArgs.length; i++)
    if (baseArgs[i].startsWith(pattern)) return true;

  return false;
};

export const getPaths = (
  prefix = '--',
  baseArgs = processArgs
): string[] | undefined => {
  const paths: string[] = [];
  const length = baseArgs.length;

  for (let i = 0; i < length; i++)
    if (!baseArgs[i].startsWith(prefix)) paths.push(baseArgs[i]);

  return paths.length > 0 ? paths : undefined;
};

export const argToArray = (
  arg: string,
  prefix = '--',
  baseArgs = processArgs
): string[] | undefined => {
  const argValue = getArg(arg, prefix, baseArgs);
  if (argValue !== undefined) return argValue.split(',').filter((a) => a);
  if (!hasArg(arg, prefix, baseArgs)) return;
  return [];
};

export const hasOnly = hasArg('only');
