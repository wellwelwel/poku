import type {
  ImportMember,
  RequireDefinition,
  Token,
} from '../../../@types/shared-resources.js';
import { sortMembers } from '../helpers/members.js';
import { parseDestructuring } from './destructuring.js';

export const processCJSRequire = (
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
