import { expect } from 'chai';
import { it } from 'mocha';

it('ok (pass)', () => {
  for (let i = 0; i < 500; i++) expect(true).to.be.ok;
});

it('equal (pass)', () => {
  for (let i = 0; i < 500; i++) expect(i).to.equal(i);
});

it('deepEqual (pass)', () => {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 500; i++) expect(a).to.deep.equal(b);
});

it('ok (fail)', () => {
  expect(false).to.be.ok;
});

it('equal (fail)', () => {
  expect(0).to.equal(1);
});

it('deepEqual (fail)', () => {
  expect({ x: 1 }).to.deep.equal({ x: 2 });
});
