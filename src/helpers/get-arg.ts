/* c8 ignore start */
import process from 'node:process';

const [, , ...args] = process.argv;

export const getArg = (arg: string): string | undefined => {
  const getArg = args.find((a) => a.startsWith(`--${arg}=`));
  if (getArg) return getArg.split('=')?.[1] || undefined;

  return undefined;
};

export const hasArg = (arg: string): boolean =>
  args.some((a) => a.startsWith(`--${arg}`));

export const getLastParam = (): string => {
  return args[args.length - 1];
};
/* c8 ignore stop */
