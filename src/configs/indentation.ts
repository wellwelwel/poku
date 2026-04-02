const indentCache: string[] = [''];

export const indentation = {
  test: '  ',
  stdio: '      ',
  describeDepth: 0,
  itDepth: 0,
  get indent(): string {
    const depth = this.describeDepth + this.itDepth;
    if (indentCache[depth] === undefined)
      indentCache[depth] = this.test.repeat(depth);
    return indentCache[depth];
  },
};
