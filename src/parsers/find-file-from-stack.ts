const regex = /(?:at\s+(?:.+?\s+\()?)((?:file:\/\/\/|\/|[a-zA-Z]:\\)[^:)]+)/;

export const findFile = (error: Error) => {
  const stackLines = error.stack?.split('\n') ?? [];

  let file = '';

  for (const line of stackLines) {
    if (line.includes('poku/lib/') || line.includes('poku/src/')) continue;

    const match = line.match(regex);

    if (match?.[1]) {
      file = match[1];
      break;
    }
  }

  return file;
};
