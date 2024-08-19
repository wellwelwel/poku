const regex = /-/g;

export const toDynamicCase = (str: string) => {
  // Short flags
  if (str[1] !== '-') {
    return str;
  }

  const [flag, ...args] = str.slice(2).split('=');
  const dynamicCase = flag.toLowerCase().replace(regex, '');

  let processArg = `--${dynamicCase}`;

  if (args.length > 0) {
    processArg += `=${args.join('=')}`;
  }

  return processArg;
};
