import { describe, it } from '../../../../../lib/modules/index.js';

describe('Snapshot update', () => {
  it('updates a stored snapshot under the --updateSnapshot flag', ({
    snapshot,
  }) => {
    snapshot({ updated: 'new value' });
  });
});
