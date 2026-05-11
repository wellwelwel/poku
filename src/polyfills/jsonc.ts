/**
 * Adapted from https://github.com/wellwelwel/jsonc.min
 */
export const JSONC = (() => {
  const DOUBLE_QUOTE = 0x22;
  const BACKSLASH = 0x5c;
  const SLASH = 0x2f;
  const ASTERISK = 0x2a;
  const COMMA = 0x2c;
  const CLOSE_BRACKET = 0x5d;
  const CLOSE_BRACE = 0x7d;
  const SPACE = 0x20;
  const BOM = 0xfeff;

  const toJSON = (content: string): string => {
    const offset = content.charCodeAt(0) === BOM ? 1 : 0;
    const length = content.length;

    let result = '';
    let segment = offset;
    let pendingComma = false;
    let cursor = offset;

    while (cursor < length) {
      const current = content.charCodeAt(cursor);

      if (current === DOUBLE_QUOTE) {
        if (pendingComma) {
          result += `,${content.slice(segment, cursor)}`;
          segment = cursor;
          pendingComma = false;
        }

        cursor++;

        for (;;) {
          const closing = content.indexOf('"', cursor);

          if (closing === -1) {
            cursor = length;
            break;
          }

          let backslashes = 0;

          for (
            let pos = closing - 1;
            pos >= cursor && content.charCodeAt(pos) === BACKSLASH;
            pos--
          ) {
            backslashes++;
          }

          cursor = closing + 1;

          if ((backslashes & 1) === 0) {
            break;
          }
        }

        continue;
      }

      if (current === SLASH) {
        const next = content.charCodeAt(cursor + 1);

        if (next === SLASH) {
          result += content.slice(segment, cursor);
          const endOfLine = content.indexOf('\n', cursor + 2);
          cursor = endOfLine === -1 ? length : endOfLine;
          segment = cursor;
          continue;
        }

        if (next === ASTERISK) {
          result += content.slice(segment, cursor);
          const endOfBlock = content.indexOf('*/', cursor + 2);
          cursor = endOfBlock === -1 ? length : endOfBlock + 2;
          segment = cursor;
          continue;
        }
      }

      if (current === COMMA) {
        if (pendingComma) {
          result += `,${content.slice(segment, cursor)}`;
        } else {
          result += content.slice(segment, cursor);
        }

        segment = cursor + 1;
        pendingComma = true;
        cursor++;
        continue;
      }

      if (current === CLOSE_BRACKET || current === CLOSE_BRACE) {
        pendingComma = false;
        cursor++;
        continue;
      }

      if (pendingComma && current > SPACE) {
        result += `,${content.slice(segment, cursor)}`;
        segment = cursor;
        pendingComma = false;
      }

      cursor++;
    }

    if (pendingComma) {
      result += ',';
    }

    result += content.slice(segment, length);

    return result;
  };

  const parse = <T = unknown>(text: string): T => JSON.parse(toJSON(text));

  return { parse };
})();
