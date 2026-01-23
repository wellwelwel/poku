import { assert } from '../../../src/modules/essentials/assert.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';
import { parseImports } from '../../../src/parsers/imports.js';

describe('Imports Parser: ESM', () => {
  it('should parse side-effect ESM imports', () => {
    const code = `import "a";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [{ module: 'a', members: [], kind: 'esm' }]);
  });

  it('should parse side-effect ESM imports with single quotes', () => {
    const code = `import 'a';`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [{ module: 'a', members: [], kind: 'esm' }]);
  });

  it('should parse side-effect ESM imports without semicolon', () => {
    const code = `import "a"`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [{ module: 'a', members: [], kind: 'esm' }]);
  });

  it('should parse default ESM imports', () => {
    const code = `import v from "b";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'b',
        members: [{ name: 'default', alias: 'v', type: 'default' }],
        kind: 'esm',
      },
    ]);
  });

  it('should parse default ESM imports without semicolon', () => {
    const code = `import v from "b"`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'b',
        members: [{ name: 'default', alias: 'v', type: 'default' }],
        kind: 'esm',
      },
    ]);
  });

  it('should parse namespace ESM imports', () => {
    const code = `import * as ns from "c";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'c',
        members: [{ name: '*', alias: 'ns', type: 'namespace' }],
        kind: 'esm',
      },
    ]);
  });

  it('should parse named ESM imports', () => {
    const code = `import { x } from "d";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'd',
        members: [{ name: 'x', alias: 'x', type: 'named' }],
        kind: 'esm',
      },
    ]);
  });

  it('should parse aliased named ESM imports', () => {
    const code = `import { x as y } from "e";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'e',
        members: [{ name: 'x', alias: 'y', type: 'named' }],
        kind: 'esm',
      },
    ]);
  });

  it('should parse mixed default and named ESM imports', () => {
    const code = `import v, { x } from "f";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'f',
        members: [
          { name: 'x', alias: 'x', type: 'named' },
          { name: 'default', alias: 'v', type: 'default' },
        ],
        kind: 'esm',
      },
    ]);
  });

  it('should parse mixed default and namespace ESM imports', () => {
    const code = `import v, * as ns from "g";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'g',
        members: [
          { name: '*', alias: 'ns', type: 'namespace' },
          { name: 'default', alias: 'v', type: 'default' },
        ],
        kind: 'esm',
      },
    ]);
  });

  it('should parse multiline ESM imports', () => {
    const code = `import {
      x
    } from "h";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'h',
        members: [{ name: 'x', alias: 'x', type: 'named' }],
        kind: 'esm',
      },
    ]);
  });

  it('should parse dynamic imports', () => {
    const code = `import("m");`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: 'm', members: [], kind: 'dynamic' },
    ]);
  });

  it('should parse dynamic imports with backticks', () => {
    const code = 'import(`./lib/modules/index.js`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.js', members: [], kind: 'dynamic' },
    ]);
  });

  it('should parse imports with extra spaces', () => {
    const code = `import    {    x    }    from    "n";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'n',
        members: [{ name: 'x', alias: 'x', type: 'named' }],
        kind: 'esm',
      },
    ]);
  });

  it('should parse multiline named and namespace ESM imports from local files', () => {
    const code = `
      import {
        a,
        B as b,
      } from './letters.js';
      import * as foo from './foo.js';`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: './letters.js',
        members: [
          { name: 'a', alias: 'a', type: 'named' },
          { name: 'B', alias: 'b', type: 'named' },
        ],
        kind: 'esm',
      },
      {
        module: './foo.js',
        members: [{ name: '*', alias: 'foo', type: 'namespace' }],
        kind: 'esm',
      },
    ]);
  });
});
