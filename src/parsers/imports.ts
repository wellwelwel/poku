import type { ImportDefinition } from '../@types/shared-resources.js';
import { processCJSRequire } from './imports/cjs/processor.js';
import { processESMImport } from './imports/esm/processor.js';
import { tokenize } from './imports/helpers/tokenize.js';

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
