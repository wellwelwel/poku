import { describe, it } from '../../../../../lib/modules/index.js';

describe('Snapshot create', () => {
  it('creates a brand new snapshot when none exists', ({ snapshot }) => {
    snapshot({ created: true });
  });
});
