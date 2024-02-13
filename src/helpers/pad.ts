/**
 * Custom implementations of `padStart` and `padEnd` for compatibility with Node.js version 6.
 */

export const padStart = (
  str: string,
  targetLength: number,
  padString: string
): string => {
  if (!padString) padString = ' ';
  if (str.length >= targetLength) return str;

  const paddingLength = targetLength - str.length;
  let fullPadString = padString.repeat(
    Math.ceil(paddingLength / padString.length)
  );

  fullPadString = fullPadString.slice(0, paddingLength);

  return fullPadString + str;
};

export const padEnd = (
  str: string,
  targetLength: number,
  padString: string
): string => {
  if (!padString) padString = ' ';
  if (str.length >= targetLength) return str;

  const paddingLength = targetLength - str.length;

  let fullPadString = padString.repeat(
    Math.ceil(paddingLength / padString.length)
  );

  fullPadString = fullPadString.slice(0, paddingLength);

  return str + fullPadString;
};
