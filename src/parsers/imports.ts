export interface ImportMember {
  name: string;
  alias: string;
  type: 'default' | 'named' | 'namespace';
}

export interface ImportDefinition {
  module: string;
  members: ImportMember[];
  kind: 'esm' | 'cjs' | 'dynamic';
}

type TokenType = 'keyword' | 'identifier' | 'string' | 'punctuation';

interface Token {
  type: TokenType;
  value: string;
  index: number;
}

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

function tokenize(input: string): Token[] {
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
        } else {
          value += input[current];
        }
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
}

function parseImportClause(tokens: Token[]): ImportMember[] {
  const members: ImportMember[] = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token.value === ',') {
      i++;
      continue;
    }

    if (token.value === '*') {
      if (i + 2 < tokens.length && tokens[i + 1].value === 'as') {
        members.push({
          name: '*',
          alias: tokens[i + 2].value,
          type: 'namespace',
        });
        i += 3;
      } else {
        i++;
      }
      continue;
    }

    if (token.value === '{') {
      i++;
      while (i < tokens.length && tokens[i].value !== '}') {
        if (tokens[i].value === ',') {
          i++;
          continue;
        }

        const name = tokens[i].value;
        let alias = name;
        i++;

        if (i < tokens.length && tokens[i].value === 'as') {
          i++;
          if (i < tokens.length) {
            alias = tokens[i].value;
            i++;
          }
        }

        members.push({
          name,
          alias,
          type: 'named',
        });
      }
      i++;
      continue;
    }

    if (token.type === 'identifier' || token.type === 'keyword') {
      members.push({
        name: 'default',
        alias: token.value,
        type: 'default',
      });
      i++;
      continue;
    }

    i++;
  }
  return members;
}

function parseDestructuring(tokens: Token[]): ImportMember[] {
  const members: ImportMember[] = [];

  if (tokens.length === 0) return members;

  if (tokens[0].value === '{') {
    let i = 1;
    while (i < tokens.length && tokens[i].value !== '}') {
      if (tokens[i].value === ',') {
        i++;
        continue;
      }

      const name = tokens[i].value;
      let alias = name;
      i++;

      if (i < tokens.length && tokens[i].value === ':') {
        i++;
        if (i < tokens.length) {
          alias = tokens[i].value;
          i++;
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
  ) {
    members.push({
      name: 'default',
      alias: tokens[0].value,
      type: 'default',
    });
  }

  return members;
}

function processESMImport(
  tokens: Token[],
  index: number
): { result?: ImportDefinition; newIndex: number } {
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
  for (let j = index + 1; j < tokens.length; j++) {
    if (tokens[j].value === 'from' && tokens[j].type === 'keyword') {
      fromIndex = j;
      break;
    }
    if (tokens[j].value === ';') break;
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
}

function processCJSRequire(
  tokens: Token[],
  index: number
): { result?: ImportDefinition; newIndex: number } {
  if (
    index + 2 < tokens.length &&
    tokens[index + 1].value === '(' &&
    tokens[index + 2].type === 'string'
  ) {
    const module = tokens[index + 2].value;
    let members: ImportMember[] = [];

    if (index > 0 && tokens[index - 1].value === '=') {
      let declIndex = -1;
      for (let j = index - 2; j >= 0; j--) {
        if (['const', 'let', 'var'].includes(tokens[j].value)) {
          declIndex = j;
          break;
        }
        if (tokens[j].value === ';') break;
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
}

export function parseImports(content: string): ImportDefinition[] {
  const tokens = tokenize(content);
  const results: ImportDefinition[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'keyword' && token.value === 'import') {
      const { result, newIndex } = processESMImport(tokens, i);
      if (result) {
        results.push(result);
      }
      if (newIndex > i) {
        i = newIndex;
      }
    }

    if (token.type === 'keyword' && token.value === 'require') {
      const { result, newIndex } = processCJSRequire(tokens, i);
      if (result) {
        results.push(result);
      }
      if (newIndex > i) {
        i = newIndex;
      }
    }
  }

  return results;
}

function sortMembers(members: ImportMember[]) {
  const order = { named: 0, namespace: 1, default: 2 };
  return members.sort((a, b) => order[a.type] - order[b.type]);
}
