/**
 * Adapted from https://github.com/wellwelwel/jsonc.min
 */
class JsoncProcessor {
  toJSON(content: string): string {
    const length = content.length;

    let inBlockComment = false;
    let inString = false;
    let skipChar = false;
    let result = '';

    for (let i = 0; i < length; i++) {
      const char = content[i];

      if (skipChar) {
        skipChar = false;
        continue;
      }

      if (inBlockComment) {
        if (char === '*' && content[i + 1] === '/') {
          inBlockComment = false;
          skipChar = true;
        }

        continue;
      }

      if (inString) {
        if (char === '"' && content[i - 1] !== '\\') {
          inString = false;
        }

        result += char;
        continue;
      }

      if (char === '"') {
        inString = true;
        result += char;
        continue;
      }

      if (char === '/' && content[i + 1] === '*') {
        inBlockComment = true;
        skipChar = true;
        continue;
      }

      if (char === '/' && content[i + 1] === '/') {
        while (i < length && content[i] !== '\n') {
          i++;
        }

        continue;
      }

      result += char;
    }

    return result;
  }

  parse<T = unknown>(text: string): T {
    const cleanContent = this.toJSON(text);

    return JSON.parse(cleanContent);
  }
}

export const JSONC = new JsoncProcessor();
