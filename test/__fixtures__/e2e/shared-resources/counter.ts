export const CounterContext = {
  name: 'shared-counter',
  factory: () => ({
    count: 0,
    inc() {
      this.count++;
      return this.count;
    },
    get() {
      return this.count;
    },
  }),
};
