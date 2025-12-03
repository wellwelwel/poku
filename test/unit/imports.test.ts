import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { parseImports } from '../../src/parsers/imports.js';

describe('parseImports', () => {
  it('should parse side-effect ESM imports', () => {
    const code = `import "a";`;
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

  it('should parse CJS require', () => {
    const code = `require("i");`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [{ module: 'i', members: [], kind: 'cjs' }]);
  });

  it('should parse assigned CJS require', () => {
    const code = `const v = require("j");`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'j',
        members: [{ name: 'default', alias: 'v', type: 'default' }],
        kind: 'cjs',
      },
    ]);
  });

  it('should parse destructured CJS require', () => {
    const code = `const { x } = require("k");`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'k',
        members: [{ name: 'x', alias: 'x', type: 'named' }],
        kind: 'cjs',
      },
    ]);
  });

  it('should parse destructured CJS require with alias', () => {
    const code = `const { x: y } = require("l");`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'l',
        members: [{ name: 'x', alias: 'y', type: 'named' }],
        kind: 'cjs',
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

  it('should handle multiple imports in one file', () => {
    const code = `
        import "a";
        const b = require("b");
        import { c } from "c";
      `;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: 'a', members: [], kind: 'esm' },
      {
        module: 'b',
        members: [{ name: 'default', alias: 'b', type: 'default' }],
        kind: 'cjs',
      },
      {
        module: 'c',
        members: [{ name: 'c', alias: 'c', type: 'named' }],
        kind: 'esm',
      },
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

  it('should parse require with extra spaces', () => {
    const code = `const    {    x    }    =    require("o");`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'o',
        members: [{ name: 'x', alias: 'x', type: 'named' }],
        kind: 'cjs',
      },
    ]);
  });
});
