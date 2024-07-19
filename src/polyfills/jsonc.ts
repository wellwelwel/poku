/**
 * Adapted from: https://github.com/wellwelwel/jsonc.min
 */
class JsoncProcessor {
  toJSON(content: string): string {
    const lines = content.split('\n');
    const resultLines: string[] = [];

    let inBlockComment = false;
    let inString = false;

    for (const line of lines) {
      let newLine = '';

      for (let i = 0; i < line.length; i++) {
        if (inBlockComment) {
          if (line[i] === '*' && line[i + 1] === '/') {
            inBlockComment = false;
            i++;
          }

          continue;
        }

        if (inString) {
          if (line[i] === '"' && line[i - 1] !== '\\') {
            inString = false;
          }
          newLine += line[i];
          continue;
        }

        if (line[i] === '"') {
          inString = true;
          newLine += line[i];
          continue;
        }

        if (line[i] === '/' && line[i + 1] === '*') {
          inBlockComment = true;
          i++;
          continue;
        }

        if (line[i] === '/' && line[i + 1] === '/') {
          break;
        }

        newLine += line[i];
      }

      if (newLine.trim().length > 0) {
        resultLines.push(newLine.trim());
      }
    }

    return resultLines.join('');
  }

  parse(text: string) {
    const cleanContent = this.toJSON(text);

    return JSON.parse(cleanContent);
  }
}

export const JSONC = new JsoncProcessor();
