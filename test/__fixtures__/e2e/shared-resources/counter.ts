import { resource } from '../../../../src/modules/index.js';

// @ts-expect-error
const module = typeof __filename === 'string' ? __filename : import.meta.url;

export const CounterContext = resource.create(() => ({
  count: 0,
  increment() {
    this.count++;
    return this.count;
  },
  getCount() {
    return this.count;
  },
}));

export const FlagContext = resource.create(
  () => ({
    active: false,
    activate() {
      this.active = true;
      return this.active;
    },
    isActive() {
      return this.active;
    },
  }),
  {
    module,
  }
);
