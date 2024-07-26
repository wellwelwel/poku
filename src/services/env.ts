export const removeComments = (input: string) => {
  let output = '';
  let quoteChar = '';
  let inQuote = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inQuote) {
      output += char;

      if (char === quoteChar && input[i - 1] !== '\\') {
        inQuote = false;
      }
    } else if (char === '"' || char === "'") {
      inQuote = true;
      quoteChar = char;
      output += char;
    } else if (char === '#') {
      break;
    } else {
      output += char;
    }
  }

  return output.trim();
};

export const parseEnvLine = (line: string) => {
  const index = line.indexOf('=');

  if (index === -1) {
    return null;
  }

  const arg = line.substring(0, index).trim();
  const value = line
    .substring(index + 1)
    .trim()
    .replace(/^['"]|['"]$/g, '');

  return { arg, value };
};

export const resolveEnvVariables = (str: string, env: typeof process.env) => {
  let result = '';
  let i = 0;

  while (i < str.length) {
    if (str[i] === '$' && str[i + 1] === '{') {
      i += 2;

      let varName = '';

      while (i < str.length && str[i] !== '}') {
        varName += str[i];
        i++;
      }

      i++;
      result += env[varName] || '';
    } else {
      result += str[i];
      i++;
    }
  }

  return result;
};
