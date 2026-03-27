import { expect } from 'chai';
import { it } from 'mocha';

it('ok', () => {
  expect(false).to.be.ok;
});

it('equal', () => {
  expect(0).to.equal(1);
});

it('deepEqual', () => {
  expect({ x: 1 }).to.deep.equal({ x: 2 });
});
