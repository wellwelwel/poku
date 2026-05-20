const onlyCall = /(?:^|[^.\w$])(?:it|test|describe)\.only\s*\(/;

export const checkOnly = (cb: unknown): boolean => {
  if (typeof cb !== 'function') return false;

  return onlyCall.test(cb.toString());
};

export const CheckNoOnly = (cb: unknown): boolean => {
  if (typeof cb !== 'function') return false;

  return !onlyCall.test(cb.toString());
};
