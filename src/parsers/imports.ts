import type {
  ImportDefinition,
  ImportMember,
  RequireDefinition,
  Token,
} from '../@types/shared-resources.js';

const keywords = new Set([
  'import',
  'from',
  'as',
  'const',
  'let',
  'var',
  'require',
]);

const whitespaceRegex = /\s/;
const identifierStartRegex = /[a-zA-Z_$]/;
const identifierPartRegex = /[a-zA-Z0-9_$]/;
const punctuationRegex = /[{}(),=*:]/;

const tokenize = (input: string): Token[] => {
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

const parseImportClause = (tokens: Token[]): ImportMember[] => {
  const members: ImportMember[] = [];
  let tokenIndex = 0;

  while (tokenIndex < tokens.length) {
    const token = tokens[tokenIndex];

    if (token.value === ',') {
      tokenIndex++;
      continue;
    }

    if (token.value === '*') {
      if (
        tokenIndex + 2 < tokens.length &&
        tokens[tokenIndex + 1].value === 'as'
      ) {
        members.push({
          name: '*',
          alias: tokens[tokenIndex + 2].value,
          type: 'namespace',
        });

        tokenIndex += 3;
      } else tokenIndex++;

      continue;
    }

    if (token.value === '{') {
      tokenIndex++;

      while (tokenIndex < tokens.length && tokens[tokenIndex].value !== '}') {
        if (tokens[tokenIndex].value === ',') {
          tokenIndex++;
          continue;
        }

        const name = tokens[tokenIndex].value;
        let alias = name;

        tokenIndex++;

        if (tokenIndex < tokens.length && tokens[tokenIndex].value === 'as') {
          tokenIndex++;

          if (tokenIndex < tokens.length) {
            alias = tokens[tokenIndex].value;
            tokenIndex++;
          }
        }

        members.push({
          name,
          alias,
          type: 'named',
        });
      }

      tokenIndex++;
      continue;
    }

    if (token.type === 'identifier' || token.type === 'keyword') {
      members.push({
        name: 'default',
        alias: token.value,
        type: 'default',
      });

      tokenIndex++;
      continue;
    }

    tokenIndex++;
  }

  return members;
};

const parseDestructuring = (tokens: Token[]): ImportMember[] => {
  const members: ImportMember[] = [];

  if (tokens.length === 0) return members;
  if (tokens[0].value === '{') {
    let tokenIndex = 1;

    while (tokenIndex < tokens.length && tokens[tokenIndex].value !== '}') {
      if (tokens[tokenIndex].value === ',') {
        tokenIndex++;
        continue;
      }

      const name = tokens[tokenIndex].value;
      let alias = name;

      tokenIndex++;

      if (tokenIndex < tokens.length && tokens[tokenIndex].value === ':') {
        tokenIndex++;

        if (tokenIndex < tokens.length) {
          alias = tokens[tokenIndex].value;
          tokenIndex++;
        }
      }

      members.push({
        name,
        alias,
        type: 'named',
      });
    }
  } else if (
    tokens.length === 1 &&
    (tokens[0].type === 'identifier' || tokens[0].type === 'keyword')
  )
    members.push({
      name: 'default',
      alias: tokens[0].value,
      type: 'default',
    });

  return members;
};

const processESMImport = (
  tokens: Token[],
  index: number
): { result?: ImportDefinition; newIndex: number } => {
  if (index + 1 < tokens.length && tokens[index + 1].value === '(') {
    if (index + 2 < tokens.length && tokens[index + 2].type === 'string') {
      return {
        result: {
          module: tokens[index + 2].value,
          members: [],
          kind: 'dynamic',
        },
        newIndex: index,
      };
    }

    return { newIndex: index };
  }

  if (index + 1 < tokens.length && tokens[index + 1].type === 'string') {
    return {
      result: {
        module: tokens[index + 1].value,
        members: [],
        kind: 'esm',
      },
      newIndex: index,
    };
  }

  let fromIndex = -1;

  for (
    let searchIndex = index + 1;
    searchIndex < tokens.length;
    searchIndex++
  ) {
    if (
      tokens[searchIndex].value === 'from' &&
      tokens[searchIndex].type === 'keyword'
    ) {
      fromIndex = searchIndex;
      break;
    }
    if (tokens[searchIndex].value === ';') break;
  }

  if (
    fromIndex !== -1 &&
    fromIndex + 1 < tokens.length &&
    tokens[fromIndex + 1].type === 'string'
  ) {
    const module = tokens[fromIndex + 1].value;
    const clauseTokens = tokens.slice(index + 1, fromIndex);
    const members = parseImportClause(clauseTokens);

    return {
      result: {
        module,
        members: sortMembers(members),
        kind: 'esm',
      },
      newIndex: fromIndex + 1,
    };
  }

  return { newIndex: index };
};

const sortMembers = (members: ImportMember[]) => {
  const order = {
    named: 0,
    namespace: 1,
    default: 2,
  };

  return members.sort((a, b) => order[a.type] - order[b.type]);
};

const processCJSRequire = (
  tokens: Token[],
  index: number
): RequireDefinition => {
  if (
    index + 2 < tokens.length &&
    tokens[index + 1].value === '(' &&
    tokens[index + 2].type === 'string'
  ) {
    const module = tokens[index + 2].value;
    let members: ImportMember[] = [];

    if (index > 0 && tokens[index - 1].value === '=') {
      let declIndex = -1;

      for (let backwardIndex = index - 2; backwardIndex >= 0; backwardIndex--) {
        if (['const', 'let', 'var'].includes(tokens[backwardIndex].value)) {
          declIndex = backwardIndex;
          break;
        }

        if (tokens[backwardIndex].value === ';') break;
      }

      if (declIndex !== -1) {
        const patternTokens = tokens.slice(declIndex + 1, index - 1);
        members = parseDestructuring(patternTokens);
      }
    }

    return {
      result: {
        module,
        members: sortMembers(members),
        kind: 'cjs',
      },
      newIndex: index,
    };
  }

  return { newIndex: index };
};

export const parseImports = (content: string): ImportDefinition[] => {
  const tokens = tokenize(content);
  const results: ImportDefinition[] = [];

  for (let tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
    const token = tokens[tokenIndex];

    if (token.type === 'keyword' && token.value === 'import') {
      const { result, newIndex } = processESMImport(tokens, tokenIndex);

      if (result) results.push(result);
      if (newIndex > tokenIndex) tokenIndex = newIndex;
    }

    if (token.type === 'keyword' && token.value === 'require') {
      const { result, newIndex } = processCJSRequire(tokens, tokenIndex);

      if (result) results.push(result);
      if (newIndex > tokenIndex) tokenIndex = newIndex;
    }
  }

  return results;
};
