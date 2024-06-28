/* c8 ignore next */ // ?
import { argv } from 'node:process';

const [, , ...processArgs] = argv;
const regexQuotes = /''|""/;

/**
 * Gets the value of an argument.
 *
 * ---
 *
 * CLI arguments examples:
 *
 * ```sh
 * command --arg=some # 'some'
 * command --arg=""   # ''
 * command --arg      # undefined
 * ```
 */
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

/**
 * Checks if an argument exists.
 *
 * ---
 *
 * CLI arguments examples:
 *
 * ```sh
 * command --arg  # true
 * command        # false
 * ```
 */
export const hasArg = (
  arg: string,
  prefix = '--',
  baseArgs = processArgs
): boolean => {
  const argPattern = `${prefix}${arg}`;

  return baseArgs.some((a) => a.startsWith(argPattern));
};

/**
 * Gets the last param/value.
 *
 * CLI arguments examples:
 *
 * ```sh
 * command --arg --arg2=some value  # 'value'
 * command value                    # 'value'
 * command                          # undefined
 * command --arg                    # undefined
 * ```
 */
export const getLastParam = (
  prefix = '--',
  baseArgs = processArgs
): string | undefined => {
  const lastArg = baseArgs[baseArgs.length - 1];

  if (!lastArg || lastArg.startsWith(prefix)) {
    return undefined;
  }

  return lastArg;
};

/* c8 ignore next */ // ?
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
