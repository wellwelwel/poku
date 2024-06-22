/* c8 ignore start */
import { argv } from 'node:process';

const [, , ...processArgs] = argv;

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
export const getArg = (arg: string, prefix = '--'): string | undefined => {
  const argPattern = `${prefix}${arg}=`;
  const argValue = processArgs.find((a) => a.startsWith(argPattern));

  if (!argValue) return undefined;

  return argValue.slice(argPattern.length).replace(/''|""/, '');
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
export const hasArg = (arg: string, prefix = '--'): boolean => {
  const argPattern = `${prefix}${arg}`;

  return processArgs.some((a) => a.startsWith(argPattern));
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
export const getLastParam = (prefix = '--'): string | undefined => {
  const lastArg = processArgs[processArgs.length - 1];

  if (!lastArg || lastArg.startsWith(prefix)) return undefined;

  return lastArg;
};

export const argToArray = (arg: string, prefix = '--') => {
  const hasArgument = hasArg(arg);
  if (!hasArgument) return undefined;

  const argValue = getArg(arg, prefix);

  if (hasArgument && !argValue) return [];
  if (!argValue) return undefined;

  return argValue
    .split(',')
    .map((a) => a.trim())
    .filter((a) => a);
};
/* c8 ignore stop */
