import type {
  ImportDefinition,
  Token,
} from '../../../@types/shared-resources.js';
import { sort } from '../helpers/sort.js';
import { getMembers } from './members.js';

export const processESM = (
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
    const members = sort(getMembers(clauseTokens));

    return {
      result: {
        module,
        members,
        kind: 'esm',
      },
      newIndex: fromIndex + 1,
    };
  }

  return { newIndex: index };
};
