import { argv } from 'node:process';
import { toDynamicCase } from './to-dynamic-case.js';

const [, , ...processArgs] = argv;
const regexQuotes = /''|""/;

const processedArgs = processArgs.map(toDynamicCase);

export const getArg = (
  arg: string,
  prefix = '--',
  baseArgs = processedArgs
): string | undefined => {
  const argPattern = `${prefix}${arg}=`;
  const argValue = baseArgs.find((a) => a.startsWith(argPattern));

  if (!argValue) {
    return undefined;
  }

  return argValue.slice(argPattern.length).replace(regexQuotes, '');
};

export const hasArg = (
  arg: string,
  prefix = '--',
  baseArgs = processedArgs
): boolean => {
  const argPattern = `${prefix}${arg}`;

  return baseArgs.some((a) => a.startsWith(argPattern));
};

export const getPaths = (
  prefix = '--',
  baseArgs = processedArgs
): string[] | undefined => {
  let hasPaths = false;
  const paths: string[] = [];

  for (const arg of baseArgs) {
    if (!arg.startsWith(prefix)) {
      hasPaths = true;
      const parts = arg.split(',');
      for (const part of parts) {
        paths.push(part);
      }
    }
  }

  return hasPaths ? paths : undefined;
};

export const argToArray = (
  arg: string,
  prefix = '--',
  baseArgs = processedArgs
) => {
  const hasArgument = hasArg(arg, prefix, baseArgs);
  if (!hasArgument) {
    return undefined;
  }

  const argValue = getArg(arg, prefix, baseArgs);

  if (!argValue) {
    return [];
  }

  return argValue
    .split(',')
    .map((a) => a.trim())
    .filter((a) => a);
};
