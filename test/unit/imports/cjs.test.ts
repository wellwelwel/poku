import { assert } from '../../../src/modules/essentials/assert.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';
import { parseImports } from '../../../src/parsers/imports.js';

describe('Imports Parser: CommonJS', () => {
  it('should parse CJS require', () => {
    const code = `require("i");`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [{ module: 'i', members: [], kind: 'cjs' }]);
  });

  it('should parse CJS require with single quotes', () => {
    const code = `require('i');`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [{ module: 'i', members: [], kind: 'cjs' }]);
  });

  it('should parse CJS require without semicolon', () => {
    const code = `require("i")`;
    const result = parseImports(code);
    assert.deepStrictEqual(result, [{ module: 'i', members: [], kind: 'cjs' }]);
  });

  it('should parse CJS require with backticks', () => {
    const code = 'require(`./lib/modules/index.js`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.js', members: [], kind: 'cjs' },
    ]);
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

  it('should parse require with extra spaces without semicolon', () => {
    const code = `const    {    x    }    =    require("o")`;
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
