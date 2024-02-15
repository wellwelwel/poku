declare const Deno: unknown;
declare const Bun: unknown;

export const getRuntime = () => {
  if (typeof Deno !== 'undefined') return 'deno';
  if (typeof Bun !== 'undefined') return 'bun';
  return 'node';
};
