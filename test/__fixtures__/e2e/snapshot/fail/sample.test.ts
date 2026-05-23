import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it.js';

describe('Snapshot fail', () => {
  it('mismatches the stored snapshot', ({ snapshot }) => {
    snapshot({ message: 'changed' });
  });
});
