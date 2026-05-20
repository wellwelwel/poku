const onlyCall = /(?:^|[^.\w$])(?:it|test|describe)\.only\s*\(/;

export const checkOnly = (cb: unknown): boolean => {
  if (typeof cb !== 'function') return false;

  return onlyCall.test(String(cb));
};

export const checkNoOnly = (cb: unknown): boolean => {
  if (typeof cb !== 'function') return false;

  return !onlyCall.test(String(cb));
};
