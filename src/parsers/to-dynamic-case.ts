const regex = /-/g;

export const toDynamicCase = (str: string) => {
  if (str[1] !== '-') return str; // Short flags

  const [flag, ...args] = str.slice(2).split('=');
  const dynamicCase = flag.toLowerCase().replace(regex, '');
  const formattedArg = args.length > 0 ? `=${args.join('=')}` : '';

  return `--${dynamicCase}${formattedArg}`;
};
