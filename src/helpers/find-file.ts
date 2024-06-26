/* c8 ignore next */ // c8 bug
const regex = /at\s(\/.+|file:.+)|^(\s+)at\smodule\scode\s\((\/.+|file:.+)\)/i;

/* c8 ignore next */ // c8 bug
export const findFile = (error: Error) => {
  const stackLines = error.stack?.split('\n') || [];

  let file = '';

  const basePath = 'poku/lib/';

  for (const line of stackLines) {
    if (line.indexOf(basePath) === -1) {
      const match = line.match(regex);

      // Node and Deno
      if (match?.[1]) {
        file = match[1];
        break;
      }

      // Bun
      if (match?.[3]) {
        file = match[3];
        break;
      }
    }
  }

  return file;
};
