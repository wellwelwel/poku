/* c8 ignore next */ // ?
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

  if (!argValue) {
    return undefined;
  }

  return argValue.slice(argPattern.length).replace(regexQuotes, '');
};

export const hasArg = (
  arg: string,
  prefix = '--',
  baseArgs = processArgs
): boolean => {
  const argPattern = `${prefix}${arg}`;

  return baseArgs.some((a) => a.startsWith(argPattern));
};

export const getPaths = (
  prefix = '--',
  baseArgs = processArgs
): string[] | undefined => {
  const paths = baseArgs
    .filter((arg) => !arg.startsWith(prefix))
    .flatMap((arg) => arg.split(','));

  console.log(paths);

  return paths.length > 0 ? paths : undefined;
};

export const argToArray = (
  arg: string,
  prefix = '--',
  baseArgs = processArgs
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
