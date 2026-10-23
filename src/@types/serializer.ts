export type ValueSerializer = {
  name: string;
  test: (value: object) => boolean;
  serialize: (
    value: object,
    serializeValue: (value: unknown) => string
  ) => string;
};
