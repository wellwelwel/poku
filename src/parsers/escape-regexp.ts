const SAFE_REGEXP = /[.*+{}[\]\\]/g;

export const escapeRegExp = (value: string): string =>
  value.replace(SAFE_REGEXP, '\\$&');

export const toRegExp = <T>(value: string | T): RegExp | Exclude<T, string> =>
  typeof value === 'string'
    ? new RegExp(escapeRegExp(value))
    : (value as Exclude<T, string>);

export const envToRegExp = (
  value: string | undefined,
  flags?: string
): RegExp | undefined =>
  value ? new RegExp(escapeRegExp(value), flags) : undefined;
