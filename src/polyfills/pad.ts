/**
 * Custom implementations of `padStart` for compatibility with Node.js version 6.
 */
export const padStart = (
  str: string,
  targetLength: number,
  padString: string
): string => {
  const defaultPad = padString ? String(padString) : ' ';

  if (str.length >= targetLength) {
    return str;
  }

  const paddingLength = targetLength - str.length;
  let fullPadString = defaultPad.repeat(
    Math.ceil(paddingLength / defaultPad.length)
  );

  fullPadString = fullPadString.slice(0, paddingLength);

  return fullPadString + str;
};
