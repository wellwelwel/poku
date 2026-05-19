const SAFE_REGEXP = /[.*{}[\]\\]/g;

export const escapeRegExp = (value: string): string =>
  value.replace(SAFE_REGEXP, '\\$&');
