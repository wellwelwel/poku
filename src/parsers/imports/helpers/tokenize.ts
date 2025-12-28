import type { Token } from '../../../@types/shared-resources.ts';

const whitespaceRegex = /\s/;
const identifierStartRegex = /[a-zA-Z_$]/;
const identifierPartRegex = /[a-zA-Z0-9_$]/;
const punctuationRegex = /[{}(),=*:]/;

const keywords = new Set([
  'import',
  'from',
  'as',
  'const',
  'let',
  'var',
  'require',
]);

export const tokenize = (input: string): Token[] => {
  const tokens: Token[] = [];
  let current = 0;

  while (current < input.length) {
    const char = input[current];

    if (whitespaceRegex.test(char)) {
      current++;
      continue;
    }

    if (char === '"' || char === "'") {
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

    if (identifierStartRegex.test(char)) {
      let value = '';
      const start = current;

      while (
        current < input.length &&
        identifierPartRegex.test(input[current])
      ) {
        value += input[current];
        current++;
      }

      const type = keywords.has(value) ? 'keyword' : 'identifier';

      tokens.push({ type, value, index: start });
      continue;
    }

    if (punctuationRegex.test(char)) {
      tokens.push({ type: 'punctuation', value: char, index: current });
      current++;
      continue;
    }

    current++;
  }

  return tokens;
};
