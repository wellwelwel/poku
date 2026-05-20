const globalScope = globalThis as Record<symbol, unknown>;

export const getSharedState = <Value>(
  name: string,
  initial: () => Value
): Value => {
  const stateKey = Symbol.for(`@poku/${name}`);

  if (globalScope[stateKey] === undefined) globalScope[stateKey] = initial();
  return globalScope[stateKey] as Value;
};
