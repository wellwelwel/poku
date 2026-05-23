import { describe, it } from '../../../../../lib/modules/index.js';

describe('Snapshot match', () => {
  it('matches an existing snapshot', ({ snapshot }) => {
    snapshot({ message: 'hello' });
  });
});
