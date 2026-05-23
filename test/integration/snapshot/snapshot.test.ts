import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it.js';

describe('Snapshot Suite', () => {
  it('matches a primitive snapshot', ({ snapshot }) => {
    snapshot('hello world');
  });

  it('matches a numeric snapshot', ({ snapshot }) => {
    snapshot(42);
  });

  it('matches an object snapshot', ({ snapshot }) => {
    snapshot({ a: 1, b: 'two', c: [3, 4] });
  });

  it('matches an array snapshot', ({ snapshot }) => {
    snapshot([1, 2, 3]);
  });

  it('supports multiple snapshots per test via counter', ({ snapshot }) => {
    snapshot({ id: 1 });
    snapshot({ id: 2 });
  });

  it('supports named hints', ({ snapshot }) => {
    snapshot({ role: 'admin' }, 'authorized user');
    snapshot({ role: 'guest' }, 'unauthorized user');
  });

  it('serializes nested structures deterministically', ({ snapshot }) => {
    snapshot({
      list: [
        { name: 'beta', value: 2 },
        { name: 'alpha', value: 1 },
      ],
      meta: { count: 2 },
    });
  });

  describe('Advanced types', () => {
    it('snapshots an Error with cause', ({ snapshot }) => {
      const withCause = Object.assign(new Error('outer'), {
        cause: new Error('inner'),
      });
      snapshot(withCause);
    });

    it('snapshots a Uint8Array', ({ snapshot }) => {
      snapshot(new Uint8Array([10, 20, 30]));
    });

    it('snapshots a URL', ({ snapshot }) => {
      snapshot(new URL('https://poku.io/docs?ref=test'));
    });

    it('snapshots a class instance', ({ snapshot }) => {
      class Person {
        name: string;
        constructor(name: string) {
          this.name = name;
        }
      }
      snapshot(new Person('Ada'));
    });
  });
});
