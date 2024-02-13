const [, , ...args] = process.argv;

export const getArg = (arg: string): string | undefined => {
  const getArg = args.find((a) => a.startsWith(`--${arg}=`));
  if (getArg) return getArg.split('=')?.[1] || undefined;

  return undefined;
};
