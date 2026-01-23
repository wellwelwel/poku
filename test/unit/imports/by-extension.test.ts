import { assert } from '../../../src/modules/essentials/assert.js';
import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it/core.js';
import { parseImports } from '../../../src/parsers/imports.js';

describe('Imports Parser by Extension', () => {
  it('ESM: should parse .js files', () => {
    const code = 'import(`./lib/modules/index.js`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.js', members: [], kind: 'dynamic' },
    ]);
  });

  it('ESM: should parse .mjs files', () => {
    const code = 'import(`./lib/modules/index.mjs`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.mjs', members: [], kind: 'dynamic' },
    ]);
  });

  it('ESM: should parse .cjs files', () => {
    const code = 'import(`./lib/modules/index.cjs`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.cjs', members: [], kind: 'dynamic' },
    ]);
  });

  it('ESM: should parse .ts files', () => {
    const code = 'import(`./lib/modules/index.ts`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.ts', members: [], kind: 'dynamic' },
    ]);
  });

  it('ESM: should parse .mts files', () => {
    const code = 'import(`./lib/modules/index.mts`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.mts', members: [], kind: 'dynamic' },
    ]);
  });

  it('ESM: should parse .cts files', () => {
    const code = 'import(`./lib/modules/index.cts`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.cts', members: [], kind: 'dynamic' },
    ]);
  });

  it('CJS: should parse .js files', () => {
    const code = 'require(`./lib/modules/index.js`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.js', members: [], kind: 'cjs' },
    ]);
  });

  it('CJS: should parse .mjs files', () => {
    const code = 'require(`./lib/modules/index.mjs`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.mjs', members: [], kind: 'cjs' },
    ]);
  });

  it('CJS: should parse .cjs files', () => {
    const code = 'require(`./lib/modules/index.cjs`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.cjs', members: [], kind: 'cjs' },
    ]);
  });

  it('CJS: should parse .ts files', () => {
    const code = 'require(`./lib/modules/index.ts`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.ts', members: [], kind: 'cjs' },
    ]);
  });

  it('CJS: should parse .mts files', () => {
    const code = 'require(`./lib/modules/index.mts`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.mts', members: [], kind: 'cjs' },
    ]);
  });

  it('CJS: should parse .cts files', () => {
    const code = 'require(`./lib/modules/index.cts`);';
    const result = parseImports(code);
    assert.deepStrictEqual(result, [
      { module: './lib/modules/index.cts', members: [], kind: 'cjs' },
    ]);
  });
});
