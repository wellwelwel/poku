import { strict as nodeAssert } from 'node:assert';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { serialize } from '../../src/parsers/output.js';

describe('DOM assertion serialization', async () => {
  await it('serializes HTML without traversing circular framework internals', () => {
    const element: Record<string, unknown> = {
      nodeType: 1,
      nodeName: 'DIV',
      outerHTML: '<div>Hello</div>',
    };
    Object.defineProperty(element, '__reactFiber', {
      enumerable: true,
      get() {
        throw new Error('framework internals must not be traversed');
      },
    });
    nodeAssert.strictEqual(serialize(element), '<div>Hello</div>');
  });

  await it('labels DOM nodes without HTML', () => {
    nodeAssert.strictEqual(
      serialize({ nodeType: 3, nodeName: '#text' }),
      '[DOMNode #text]'
    );
  });
});
