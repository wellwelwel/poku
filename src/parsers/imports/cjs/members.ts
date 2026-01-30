import type { ImportMember, Token } from '../../../@types/shared-resources.js';

export const getMembers = (tokens: Token[]): ImportMember[] => {
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
