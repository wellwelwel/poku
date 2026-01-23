import type { Token } from '../../../@types/shared-resources.ts';

const regex = {
  whitespace: /\s/,
  identifierStart: /[a-zA-Z_$]/,
  identifierPart: /[a-zA-Z0-9_$]/,
  punctuation: /[{}(),=*:]/,
} as const;

export const tokenize = (input: string): Token[] => {
  const keywords = new Set([
    'import',
    'from',
    'as',
    'const',
    'let',
    'var',
    'require',
  ]);
  const tokens: Token[] = [];
  let current = 0;

  while (current < input.length) {
    const char = input[current];

    if (regex.whitespace.test(char)) {
      current++;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      let value = '';
      const quote = char;
      const start = current;

      current++;

      while (current < input.length && input[current] !== quote) {
        if (input[current] === '\\') {
          current++;
          if (current < input.length) value += input[current];
        } else value += input[current];

        current++;
      }

      current++;
      tokens.push({ type: 'string', value, index: start });
      continue;
    }

    if (regex.identifierStart.test(char)) {
      let value = '';
      const start = current;

      while (
        current < input.length &&
        regex.identifierPart.test(input[current])
      ) {
        value += input[current];
        current++;
      }

      const type = keywords.has(value) ? 'keyword' : 'identifier';

      tokens.push({ type, value, index: start });
      continue;
    }

    if (regex.punctuation.test(char)) {
      tokens.push({ type: 'punctuation', value: char, index: current });
      current++;
      continue;
    }

    current++;
  }

  return tokens;
};
