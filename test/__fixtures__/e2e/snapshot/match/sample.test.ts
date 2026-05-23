import { describe } from '../../../../../src/modules/helpers/describe.js';
import { it } from '../../../../../src/modules/helpers/it.js';

describe('Snapshot match', () => {
  it('matches an existing snapshot', ({ snapshot }) => {
    snapshot({ message: 'hello' });
  });
});
