import { expect } from 'chai';
import { describe, it } from 'mocha';

it('flat ok', function () {
  expect(false).to.be.ok;
});
it('flat equal', function () {
  expect(0).to.equal(1);
});
it('flat deepEqual', function () {
  expect({ x: 1 }).to.deep.equal({ x: 2 });
});

describe('Suite', function () {
  it('ok', function () {
    expect(false).to.be.ok;
  });
  it('equal', function () {
    expect(0).to.equal(1);
  });

  describe('Nested', function () {
    it('ok', function () {
      expect(false).to.be.ok;
    });
    it('deep', function () {
      expect({ x: 1 }).to.deep.equal({ x: 2 });
    });

    describe('Deep', function () {
      it('ok', function () {
        expect(false).to.be.ok;
      });
      it('equal', function () {
        expect(0).to.equal(1);
      });
    });
  });
});
