import { EOL } from 'node:os';

/* c8 ignore start */
export const findFile = (error: Error) => {
  const stackLines = error.stack?.split(EOL) || [];

  let file = '';

  const basePath = 'poku/lib/';

  for (const line of stackLines) {
    if (!line.includes(basePath)) {
      const match = line.match(
        /at\s(\/.+|file:.+)|^(\s+)at\smodule\scode\s\((\/.+|file:.+)\)/i
      );

      // Node and Deno
      if (match && match[1]) {
        file = match[1];
        break;
      }

      // Bun
      if (match && match[3]) {
        file = match[3];
        break;
      }
    }
  }

  return file;
};
/* c8 ignore stop */
