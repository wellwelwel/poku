import { resource } from '../../../../../src/modules/index.js';

export const BrokenContext = resource.create(() => {
  throw new Error('Intentional factory error');
});
