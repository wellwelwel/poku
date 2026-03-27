import { expect } from 'chai';
import { describe, it } from 'mocha';

it('flat ok', function () {
  for (let i = 0; i < 50; i++) expect(true).to.be.ok;
});

it('flat equal', function () {
  for (let i = 0; i < 50; i++) expect(i).to.equal(i);
});

it('flat deepEqual', function () {
  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } };
  for (let i = 0; i < 50; i++) expect(a).to.deep.equal(b);
});

for (let i = 0; i < 3; i++) {
  describe(`Suite ${i}`, function () {
    it(`ok ${i}`, function () {
      expect(true).to.be.ok;
    });
    it(`equal ${i}`, function () {
      expect(i).to.equal(i);
    });

    describe(`Nested ${i}`, function () {
      it(`ok ${i}`, function () {
        expect(true).to.be.ok;
      });
      it(`deep ${i}`, function () {
        expect({ x: i }).to.deep.equal({ x: i });
      });

      describe(`Deep ${i}`, function () {
        it(`ok ${i}`, function () {
          expect(true).to.be.ok;
        });
        it(`equal ${i}`, function () {
          expect(i).to.equal(i);
        });
      });
    });
  });
}
