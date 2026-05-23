import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it.js';

describe('Snapshot update', () => {
  it('updates a stored snapshot under the --updateSnapshot flag', ({
    snapshot,
  }) => {
    snapshot({ updated: 'new value' });
  });
});
