/* c8 ignore start */
import process from 'node:process';

const [, , ...processArgs] = process.argv;

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
  const mountArg = processArgs.find((a) => a.startsWith(`${prefix}${arg}=`));
  if (!mountArg) return undefined;

  return mountArg.split('=')?.[1].replace(/''|""/, '');
};

/**
 * Parses all arguments of an argument value.
 *
 * ---
 *
 * CLI arguments examples:
 *
 * ```sh
 * command --arg='--sub=some'         # ['--sub=some']
 * command --arg='--sub=some, --sub2' # ['--sub=some', '--sub2']
 * ```
 */
export const getSubArg = (arg: string, prefix = '--') => {
  if (hasArg(arg) && !getArg(arg)?.[1]) return [];

  return processArgs
    .find((a) => a.startsWith(`${prefix}${arg}=`))
    ?.split(`--${arg}=`)[1]
    .split(',')
    .map((a) => a.trim())
    .filter((a) => a && !/''|""/.test(a));
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
export const hasArg = (arg: string, prefix = '--'): boolean =>
  processArgs.some((a) => a.startsWith(`${prefix}${arg}`));

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

// TODO (Custom Args)
// export const getAllArgs = (arg: string, prefix = '--'): string[] => {
//   return processArgs
//     .filter((a) => a.startsWith(`${prefix}${arg}=`) || a === `${prefix}${arg}`)
//     .map((a) => {
//       const [key, ...value] = a.split('=');
//       return value.length > 0 ? value.join('=') : key;
//     });
// };

// TODO (Custom Args)
// export const setArgs = (
//   args: (string | Record<string, string>)[],
//   options?: { prefix: string }
// ): string[] => {
//   const customArgs: string[] = [];
//   const prefix = options?.prefix || '';

//   args.forEach((arg) => {
//     if (!Array.isArray(arg) && typeof arg === 'object') {
//       for (const key in arg) {
//         customArgs.push(`${prefix}${key}=${arg[key]}`);
//       }

//       return;
//     }

//     customArgs.push(`${prefix}${arg}`);
//   });

//   return customArgs;
// };
/* c8 ignore stop */
