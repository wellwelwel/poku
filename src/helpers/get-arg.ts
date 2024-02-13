const [, , ...args] = process.argv;

export const getArg = (arg: string): string | null => {
  const getArg = args.find((a) => a.startsWith(`--${arg}=`));
  if (getArg) return getArg.split('=')?.[1] || null;

  return null;
};
