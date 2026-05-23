export const getTitle = (input: unknown): string | undefined =>
  typeof input === 'string' ? input : undefined;

export const getCallback = <Cb>(input: unknown): Cb | undefined =>
  typeof input === 'function' ? (input as Cb) : undefined;
