export const removeComments = (input: string) => {
  let inQuote = false;
  let quoteChar = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inQuote) {
      if (char === quoteChar && input[i - 1] !== '\\') inQuote = false;
    } else if (char === '"' || char === "'") {
      inQuote = true;
      quoteChar = char;
    } else if (char === '#') return input.slice(0, i).trim();
  }

  return input.trim();
};

export const parseEnvLine = (line: string) => {
  const index = line.indexOf('=');

  if (index === -1) return null;

  const arg = line.substring(0, index).trim();
  const value = line
    .substring(index + 1)
    .trim()
    .replace(/^['"]|['"]$/g, '');

  return { arg, value };
};

export const resolveEnvVariables = (str: string, env: typeof process.env) => {
  let result = '';
  let rangeStart = 0;
  let i = 0;

  while (i < str.length) {
    if (str[i] === '$' && str[i + 1] === '{') {
      result += str.slice(rangeStart, i);
      i += 2;
      const varStart = i;
      while (i < str.length && str[i] !== '}') i++;
      result += env[str.slice(varStart, i)] ?? '';
      i++;
      rangeStart = i;
    } else {
      i++;
    }
  }

  if (rangeStart === 0) return str;
  if (rangeStart < str.length) result += str.slice(rangeStart);
  return result;
};
