const charCode = {
  colon: 58,
  slash: 47,
  backslash: 92,
  space: 32,
  openParen: 40,
  zero: 48,
  nine: 57,
  upperA: 65,
  upperZ: 90,
  lowerA: 97,
  lowerZ: 122,
} as const;

const FILE_PROTOCOL = 'file://';
const FILE_PROTOCOL_LENGTH = FILE_PROTOCOL.length;
const INTERNAL_PATH = 'poku/lib/';

const isAlpha = (code: number): boolean =>
  (code >= charCode.upperA && code <= charCode.upperZ) ||
  (code >= charCode.lowerA && code <= charCode.lowerZ);

const isDigit = (code: number): boolean =>
  code >= charCode.zero && code <= charCode.nine;

const findPathStart = (line: string): number => {
  // "file://"
  const protoIndex = line.indexOf(FILE_PROTOCOL);
  if (protoIndex !== -1) return protoIndex + FILE_PROTOCOL_LENGTH;

  // Unix absolute path
  const slashIndex = line.indexOf('/');
  if (slashIndex === 0) return 0;
  if (
    slashIndex > 0 &&
    (line.charCodeAt(slashIndex - 1) === charCode.space ||
      line.charCodeAt(slashIndex - 1) === charCode.openParen)
  )
    return slashIndex;

  // Windows absolute path
  const length = line.length;
  for (let i = 0; i < length - 2; i++) {
    if (
      isAlpha(line.charCodeAt(i)) &&
      line.charCodeAt(i + 1) === charCode.colon &&
      line.charCodeAt(i + 2) === charCode.backslash
    )
      return i;
  }

  return -1;
};

const findLineColStart = (line: string, after: number): number => {
  let position = -1;

  for (let i = line.length - 1; i > after; i--) {
    if (
      line.charCodeAt(i) === charCode.colon &&
      i + 1 < line.length &&
      isDigit(line.charCodeAt(i + 1))
    )
      position = i;
  }

  return position;
};

export const findFileFromStack = (
  stack: string | undefined,
  options?: { skipInternal?: boolean }
): string => {
  if (!stack) return '';

  const lines = stack.split('\n');
  const skipInternal = options?.skipInternal;

  for (const line of lines) {
    if (skipInternal && line.indexOf(INTERNAL_PATH) !== -1) continue;

    const pathStart = findPathStart(line);
    if (pathStart === -1) continue;

    const colonPos = findLineColStart(line, pathStart);
    if (colonPos === -1) continue;

    if (skipInternal) {
      const protoIndex = line.indexOf(FILE_PROTOCOL);
      const start = protoIndex !== -1 ? protoIndex : pathStart;

      let end = line.length;
      while (end > colonPos && !isDigit(line.charCodeAt(end - 1))) end--;

      return line.slice(start, end);
    }

    return line.slice(pathStart, colonPos);
  }

  return '';
};
