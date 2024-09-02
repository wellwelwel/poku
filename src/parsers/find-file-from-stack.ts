const regex = /at\s(\/.+|file:.+)|^(\s+)at\smodule\scode\s\((\/.+|file:.+)\)/i;

export const findFile = (error: Error) => {
  const stackLines = error.stack?.split('\n') || [];

  let file = '';

  const basePath = 'poku/lib/';

  for (const line of stackLines) {
    if (line.indexOf(basePath) !== -1) continue;

    const match = line.match(regex);

    if (match?.[1]) {
      file = match[1];
      break;
    }

    if (match?.[3]) {
      file = match[3];
      break;
    }
  }

  return file;
};
