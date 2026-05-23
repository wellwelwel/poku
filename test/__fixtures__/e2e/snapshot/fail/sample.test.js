import { describe, it } from '../../../../../lib/modules/index.js';

describe('Snapshot fail', () => {
  it('mismatches the stored snapshot', ({ snapshot }) => {
    snapshot({ message: 'changed' });
  });
});
