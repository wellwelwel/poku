export const checkOnly = (cb: unknown): boolean => {
  if (typeof cb !== 'function') return false;

  const body = cb.toString();

  return (
    body.includes('it.only') ||
    body.includes('test.only') ||
    body.includes('describe.only')
  );
};

export const CheckNoOnly = (cb: unknown): boolean => {
  if (typeof cb !== 'function') return false;

  const body = cb.toString();

  return !(
    body.includes('it.only') ||
    body.includes('test.only') ||
    body.includes('describe.only')
  );
};
