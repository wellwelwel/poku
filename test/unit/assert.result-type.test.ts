import { test, assert, describe } from '../../src/index.js';
import { parseResultType } from '../../src/helpers/parse-assertion.js';
import { nodeVersion } from '../../src/helpers/get-runtime.js';

describe('Assert: Parse Result Type', { background: false, icon: '🔬' });
test(async () => {
  assert.deepStrictEqual(
    parseResultType(),
    'undefined',
    'Undefined (Implicit)'
  );
  assert.deepStrictEqual(
    parseResultType(undefined),
    'undefined',
    'Undefined (Explicit)'
  );
  assert.deepStrictEqual(parseResultType(null), 'null', 'Null');
  assert.deepStrictEqual(parseResultType(true), 'true', 'True');
  assert.deepStrictEqual(parseResultType(false), 'false', 'False');
  assert.deepStrictEqual(parseResultType('string'), 'string', 'String');
  assert.deepStrictEqual(
    parseResultType(`
      Multi

      Line
    `),
    `
      Multi

      Line
    `,
    'String (Multi Line/Table)'
  );
  assert.deepStrictEqual(parseResultType(123), '123', 'Number');
  if (!nodeVersion || nodeVersion >= 10) {
    const module = await import('../../fixtures/sintax/big-int.js');
    assert.deepStrictEqual(
      parseResultType(module.bigIntValue),
      '987456321456987456321',
      'Big Int'
    );
  }
  assert.deepStrictEqual(parseResultType(/123/), '/123/', 'Regex');

  assert(/=>/.test(parseResultType(() => {})), 'Anonymous Function');
  assert(
    /=>/.test(parseResultType((a: number) => a)),
    'Anonymous Function (Param)'
  );
  assert(
    /=>/.test(parseResultType((a: number, b: number) => a + b)),
    'Anonymous Function (Params)'
  );

  assert(
    /function/.test(
      parseResultType(function () {
        return;
      })
    ),
    'Function'
  );
  assert(
    /function/.test(
      parseResultType(function (a: number) {
        return a;
      })
    ),
    'Function (Param)'
  );
  assert(
    /function/.test(
      parseResultType(function (a: number, b: number) {
        return a + b;
      })
    ),
    'Function (Params)'
  );

  assert.deepStrictEqual(
    parseResultType({ a: true }),
    `{
  "a": true
}`,
    'Object'
  );
  assert.deepStrictEqual(parseResultType({}), '{}', 'Object (Empty)');
  assert.deepStrictEqual(
    parseResultType({ a: { b: 123 }, c: [/123/gi] }),
    `{
  "a": {
    "b": 123
  },
  "c": [
    "/123/gi"
  ]
}`,
    'Object (Complex)'
  );
});
assert.deepStrictEqual(
  parseResultType([1]),
  `[
  1
]`,
  'Array'
);
assert.deepStrictEqual(parseResultType([]), `[]`, 'Array (Empty)');
assert.deepStrictEqual(
  parseResultType([
    1,
    true,
    undefined,
    /123/gm,
    { a: { b: [{ c: undefined }] } },
    [[[[/[^0-9]/]]]],
  ]),
  `[
  1,
  true,
  "undefined",
  "/123/gm",
  {
    "a": {
      "b": [
        {
          "c": "undefined"
        }
      ]
    }
  },
  [
    [
      [
        [
          "/[^0-9]/"
        ]
      ]
    ]
  ]
]`,
  'Array Complex'
);
