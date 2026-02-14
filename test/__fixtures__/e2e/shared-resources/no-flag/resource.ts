import { resource } from '../../../../../src/modules/index.js';

export const SimpleContext = resource.create(() => ({
  value: 42,
  getValue() {
    return this.value;
  },
}));
