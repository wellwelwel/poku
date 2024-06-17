/* c8 ignore start */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const entries = (obj: { [key: string]: any }): [string, unknown][] => {
  const ownProps = Object.keys(obj);
  let i = ownProps.length;
  const resArray = new Array(i);

  // benchmark `while` outperformed `for`
  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

  return resArray;
};

export const fromEntries = (
  entries: [string, unknown][] | Map<string, unknown>
): Record<string, unknown> => {
  const mappedEntries = entries instanceof Map ? Array.from(entries) : entries;

  return mappedEntries.reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, unknown>
  );
};

/* c8 ignore stop */
