import type { ImportMember, Token } from '../../../@types/shared-resources.js';

export const getMembers = (tokens: Token[]): ImportMember[] => {
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
