/* c8 ignore start */
export const forceArray = <T>(input: T | T[]): T[] => {
  if (Array.isArray(input)) return input;
  return [input];
};
/* c8 ignore stop */
