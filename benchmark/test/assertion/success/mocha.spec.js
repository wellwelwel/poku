import { expect } from 'chai';
import { it } from 'mocha';

it('assertions', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 1_000; i++) {
    expect(true).to.be.ok;
    expect(i).to.equal(i);
    expect(a).to.deep.equal(b);
  }
});
