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

for (let i = 0; i < 3; i++) {
  describe(`Suite ${i}`, function () {
    it(`ok ${i}`, function () {
      expect(false).to.be.ok;
    });
    it(`equal ${i}`, function () {
      expect(0).to.equal(1);
    });

    describe(`Nested ${i}`, function () {
      it(`ok ${i}`, function () {
        expect(false).to.be.ok;
      });
      it(`deep ${i}`, function () {
        expect({ x: 1 }).to.deep.equal({ x: 2 });
      });

      describe(`Deep ${i}`, function () {
        it(`ok ${i}`, function () {
          expect(false).to.be.ok;
        });
        it(`equal ${i}`, function () {
          expect(0).to.equal(1);
        });
      });
    });
  });
}
