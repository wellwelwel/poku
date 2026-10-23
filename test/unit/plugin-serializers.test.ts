import { strict as nodeAssert } from 'node:assert';
import { createRequire } from 'node:module';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';
import { registerSerializer } from '../../src/modules/plugins.js';
import { serialize } from '../../src/parsers/output.js';

class Box {
  constructor(readonly value: unknown) {}
}

await describe('Plugin serializers', async () => {
  await it('shares registrations and disposal between CommonJS and ESM consumers', () => {
    const require = createRequire(import.meta.url);
    const plugins = require('../../lib/modules/plugins.cjs');
    const dispose = plugins.registerSerializer({
      name: 'test.commonjs',
      test: (value: object) => value instanceof Box,
      serialize: () => 'CommonJS serializer',
    });
    try {
      nodeAssert.strictEqual(serialize(new Box(42)), 'CommonJS serializer');
    } finally {
      dispose();
    }
    nodeAssert.doesNotMatch(serialize(new Box(42)), /CommonJS serializer/);
  });
  await it('does not probe DOM-shaped getters without a registered serializer', () => {
    let reads = 0;
    const value = Object.defineProperties(
      { content: 42 },
      {
        nodeType: {
          get: () => {
            reads++;
            throw new Error('unexpected getter');
          },
        },
        nodeName: {
          get: () => {
            reads++;
            throw new Error('unexpected getter');
          },
        },
      }
    );
    nodeAssert.match(serialize(value), /"content": 42/);
    nodeAssert.strictEqual(reads, 0);
    nodeAssert.match(
      serialize({ nodeType: 1, nodeName: 'fake', content: 42 }),
      /"content": 42/
    );
  });

  await it('uses opt-in serializers for nested values and restores the default after disposal', () => {
    const dispose = registerSerializer({
      name: 'test.box',
      test: (value) => value instanceof Box,
      serialize: (value, serializeValue) =>
        `Box(${serializeValue((value as Box).value)})`,
    });
    try {
      nodeAssert.match(serialize({ box: new Box(42) }), /"box": Box\(42\)/);
      nodeAssert.match(serialize(new Date(0)), /1970-01-01/);
    } finally {
      dispose();
      dispose();
    }
    nodeAssert.doesNotMatch(serialize(new Box(42)), /Box\(42\)/);
  });

  await it('preserves circular-reference tracking and releases it after formatter errors', () => {
    let shouldThrow = true;
    const dispose = registerSerializer({
      name: 'test.circular',
      test: (value) => value instanceof Box,
      serialize: (value, serializeValue) => {
        if (shouldThrow) throw new Error('formatter failed');
        return `Box(${serializeValue((value as Box).value)})`;
      },
    });
    const value = new Box(null);
    const circular = new Box(value);
    Object.defineProperty(value, 'value', { value: circular });
    try {
      nodeAssert.throws(() => serialize(value), /formatter failed/);
      shouldThrow = false;
      nodeAssert.strictEqual(serialize(value), 'Box(Box([Circular]))');
    } finally {
      dispose();
    }
  });

  await it('keeps registration order and protects replacements from stale disposers', () => {
    const first = registerSerializer({
      name: 'test.first',
      test: () => true,
      serialize: () => 'first',
    });
    const second = registerSerializer({
      name: 'test.second',
      test: () => true,
      serialize: () => 'second',
    });
    const replacement = registerSerializer({
      name: 'test.first',
      test: () => true,
      serialize: () => 'replacement',
    });
    try {
      first();
      nodeAssert.strictEqual(serialize({}), 'replacement');
      replacement();
      nodeAssert.strictEqual(serialize({}), 'second');
    } finally {
      first();
      second();
      replacement();
    }
  });

  await it('rejects invalid registration before changing the registry', () => {
    nodeAssert.throws(
      () =>
        registerSerializer({ name: '', test: () => true, serialize: () => '' }),
      /nonempty name/
    );
    nodeAssert.throws(
      () =>
        registerSerializer({
          name: 'test.invalid',
          test: undefined!,
          serialize: () => '',
        }),
      /test function/
    );
    nodeAssert.throws(
      () =>
        registerSerializer({
          name: 'test.invalid',
          test: () => true,
          serialize: undefined!,
        }),
      /serialize function/
    );
  });

  await it('does not invoke matchers for primitives and propagates matcher errors', () => {
    let calls = 0;
    const dispose = registerSerializer({
      name: 'test.matcher',
      test: () => {
        calls++;
        throw new Error('matcher failed');
      },
      serialize: () => '',
    });
    try {
      nodeAssert.strictEqual(serialize('plain'), '"plain"');
      nodeAssert.strictEqual(serialize(42), '42');
      nodeAssert.strictEqual(serialize(null), 'null');
      nodeAssert.strictEqual(calls, 0);
      nodeAssert.throws(() => serialize({}), /matcher failed/);
      nodeAssert.strictEqual(calls, 1);
    } finally {
      dispose();
    }
  });
});
