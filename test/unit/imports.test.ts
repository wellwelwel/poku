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

  it('should parse mixed ESM and CJS with extreme spacing', () => {
    const code = `
      import       {       x       ,       y       as       z       }       from       "weird-spacing"       ;
      const       {       a       :       b       ,       c       }       =       require       (       "cjs-weird"       )       ;
      import       default_val       from       "default-weird"       ;
    `;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'weird-spacing',
        members: [
          { name: 'x', alias: 'x', type: 'named' },
          { name: 'y', alias: 'z', type: 'named' },
        ],
        kind: 'esm',
      },
      {
        module: 'cjs-weird',
        members: [
          { name: 'a', alias: 'b', type: 'named' },
          { name: 'c', alias: 'c', type: 'named' },
        ],
        kind: 'cjs',
      },
      {
        module: 'default-weird',
        members: [{ name: 'default', alias: 'default_val', type: 'default' }],
        kind: 'esm',
      },
    ]);
  });

  it('should parse extremely multiline imports with mixed quotes', () => {
    const code = `
      import {
        first,
        second as
          secondAlias,
        third
      } from 'multiline-module';

      const {
        fourth: fourthAlias,
        fifth
      } = require("another-module");

      import
        default_export
      from
        "default-module";
    `;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'multiline-module',
        members: [
          { name: 'first', alias: 'first', type: 'named' },
          { name: 'second', alias: 'secondAlias', type: 'named' },
          { name: 'third', alias: 'third', type: 'named' },
        ],
        kind: 'esm',
      },
      {
        module: 'another-module',
        members: [
          { name: 'fourth', alias: 'fourthAlias', type: 'named' },
          { name: 'fifth', alias: 'fifth', type: 'named' },
        ],
        kind: 'cjs',
      },
      {
        module: 'default-module',
        members: [
          { name: 'default', alias: 'default_export', type: 'default' },
        ],
        kind: 'esm',
      },
    ]);
  });

  it('should parse imports with trailing commas and odd formatting', () => {
    const code = `
      import {
        alpha,
        beta,
        gamma as greekGamma,
      } from "greek-letters";

      const {
        delta: deltaAlias,
        epsilon,
      } = require('more-letters');
    `;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'greek-letters',
        members: [
          { name: 'alpha', alias: 'alpha', type: 'named' },
          { name: 'beta', alias: 'beta', type: 'named' },
          { name: 'gamma', alias: 'greekGamma', type: 'named' },
        ],
        kind: 'esm',
      },
      {
        module: 'more-letters',
        members: [
          { name: 'delta', alias: 'deltaAlias', type: 'named' },
          { name: 'epsilon', alias: 'epsilon', type: 'named' },
        ],
        kind: 'cjs',
      },
    ]);
  });

  it('should parse complex mixed imports with different quote styles', () => {
    const code = `
      import * as Utils from "utils";
      const fs = require('fs');
      import { readFile } from 'fs/promises';
      const { join: pathJoin } = require("path");
      import("dynamic-module");
      import defaultExport, { namedExport } from './local-file.js';
    `;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'utils',
        members: [{ name: '*', alias: 'Utils', type: 'namespace' }],
        kind: 'esm',
      },
      {
        module: 'fs',
        members: [{ name: 'default', alias: 'fs', type: 'default' }],
        kind: 'cjs',
      },
      {
        module: 'fs/promises',
        members: [{ name: 'readFile', alias: 'readFile', type: 'named' }],
        kind: 'esm',
      },
      {
        module: 'path',
        members: [{ name: 'join', alias: 'pathJoin', type: 'named' }],
        kind: 'cjs',
      },
      {
        module: 'dynamic-module',
        members: [],
        kind: 'dynamic',
      },
      {
        module: './local-file.js',
        members: [
          { name: 'namedExport', alias: 'namedExport', type: 'named' },
          { name: 'default', alias: 'defaultExport', type: 'default' },
        ],
        kind: 'esm',
      },
    ]);
  });

  it('should parse imports with unusual line breaks and indentation', () => {
    const code = `import{x,
      y as yAlias,z}from"messy-module";
const{a:aAlias,
    b,
c}=require("cjs-messy");
import
*
as
namespace
from
"namespace-messy";`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'messy-module',
        members: [
          { name: 'x', alias: 'x', type: 'named' },
          { name: 'y', alias: 'yAlias', type: 'named' },
          { name: 'z', alias: 'z', type: 'named' },
        ],
        kind: 'esm',
      },
      {
        module: 'cjs-messy',
        members: [
          { name: 'a', alias: 'aAlias', type: 'named' },
          { name: 'b', alias: 'b', type: 'named' },
          { name: 'c', alias: 'c', type: 'named' },
        ],
        kind: 'cjs',
      },
      {
        module: 'namespace-messy',
        members: [{ name: '*', alias: 'namespace', type: 'namespace' }],
        kind: 'esm',
      },
    ]);
  });

  it('should parse mixed ESM default and namespace with CJS destructuring', () => {
    const code = `
      import defaultVal, * as everything from "mixed-default-namespace";
      const { prop1, prop2: renamedProp2, prop3 } = require("cjs-destructured");
      import sideEffect from "side-effect-module";
      const entireModule = require("entire-cjs-module");
    `;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'mixed-default-namespace',
        members: [
          { name: '*', alias: 'everything', type: 'namespace' },
          { name: 'default', alias: 'defaultVal', type: 'default' },
        ],
        kind: 'esm',
      },
      {
        module: 'cjs-destructured',
        members: [
          { name: 'prop1', alias: 'prop1', type: 'named' },
          { name: 'prop2', alias: 'renamedProp2', type: 'named' },
          { name: 'prop3', alias: 'prop3', type: 'named' },
        ],
        kind: 'cjs',
      },
      {
        module: 'side-effect-module',
        members: [{ name: 'default', alias: 'sideEffect', type: 'default' }],
        kind: 'esm',
      },
      {
        module: 'entire-cjs-module',
        members: [{ name: 'default', alias: 'entireModule', type: 'default' }],
        kind: 'cjs',
      },
    ]);
  });

  it('should parse imports with no spaces around braces and operators', () => {
    const code = `
      import{a,b as B,c}from"no-spaces";
      const{x:X,y,z}=require("cjs-no-spaces");
      import*as cramped from"cramped-namespace";
    `;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      {
        module: 'no-spaces',
        members: [
          { name: 'a', alias: 'a', type: 'named' },
          { name: 'b', alias: 'B', type: 'named' },
          { name: 'c', alias: 'c', type: 'named' },
        ],
        kind: 'esm',
      },
      {
        module: 'cjs-no-spaces',
        members: [
          { name: 'x', alias: 'X', type: 'named' },
          { name: 'y', alias: 'y', type: 'named' },
          { name: 'z', alias: 'z', type: 'named' },
        ],
        kind: 'cjs',
      },
      {
        module: 'cramped-namespace',
        members: [{ name: '*', alias: 'cramped', type: 'namespace' }],
        kind: 'esm',
      },
    ]);
  });
});
