import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it.js';

describe('Snapshot create', () => {
  it('creates a brand new snapshot when none exists', ({ snapshot }) => {
    snapshot({ created: true });
  });
});
