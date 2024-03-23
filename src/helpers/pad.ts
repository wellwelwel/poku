/**
 * Custom implementations of `padStart` for compatibility with Node.js version 6.
 */

/* c8 ignore start */
export const padStart = (
  str: string,
  targetLength: number,
  padString: string
): string => {
  padString = !padString ? ' ' : String(padString);

  if (str.length >= targetLength) return str;

  const paddingLength = targetLength - str.length;
  let fullPadString = padString.repeat(
    Math.ceil(paddingLength / padString.length)
  );

  fullPadString = fullPadString.slice(0, paddingLength);

  return fullPadString + str;
};
/* c8 ignore end */
