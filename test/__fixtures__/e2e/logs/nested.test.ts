import { assert, describe, it } from '../../../../src/modules/index.js';

describe('A', () => {
  describe('B', () => {
    describe('C', () => {
      describe('D', () => {
        assert(true, 'Nested `describe`');
      });
    });
  });
});

it('A', () => {
  it('B', () => {
    it('C', () => {
      it('D', () => {
        assert(true, 'Nested `it`');
      });
    });
  });
});

describe('A', () => {
  describe('B', () => {
    describe('C', () => {
      describe('D', () => {
        it('E', () => {
          it('F', () => {
            it('G', () => {
              it('H', () => {
                assert(true, 'Nested `describe` + `it`');
              });
            });
          });
        });
      });
    });
  });
});

it('A', () => {
  it('B', () => {
    it('C', () => {
      it('D', () => {
        describe('E', () => {
          describe('F', () => {
            describe('G', () => {
              describe('H', () => {
                assert(true, 'Nested `it` + `describe`');
              });
            });
          });
        });
      });
    });
  });
});

describe(() => {
  describe('A', () => {
    describe(() => {
      describe('B', () => {
        it(() => {
          it('C', () => {
            it(() => {
              it('D', () => {
                assert(
                  true,
                  'Nested `it` + `describe` with intercalated titles'
                );
              });
            });
          });
        });
      });
    });
  });
});
