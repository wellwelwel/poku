import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import {
  getArg,
  hasArg,
  argToArray,
  getPaths,
} from '../../src/parsers/get-arg.js';

describe('CLI Argument Handling Functions', () => {
  it('should get argument value', () => {
    const args = ['--arg=value'];
    const result = getArg('arg', '--', args);
    assert.strictEqual(result, 'value', 'Argument value should be "value"');
  });

  it('should return undefined for missing argument value', () => {
    const args = ['--arg'];
    const result = getArg('arg', '--', args);
    assert.strictEqual(result, undefined, 'Argument value should be undefined');
  });

  it('should check if argument exists', () => {
    const args = ['--checkArg'];
    const result = hasArg('checkArg', '--', args);
    assert.strictEqual(result, true, 'Argument should exist');
  });

  it('should check if argument does not exist', () => {
    const args = ['--anotherArg'];
    const result = hasArg('checkArg', '--', args);
    assert.strictEqual(result, false, 'Argument should not exist');
  });

  it('should convert argument to array', () => {
    const args = ['--array=1,2,3'];
    const result = argToArray('array', '--', args);
    assert.deepStrictEqual(
      result,
      ['1', '2', '3'],
      'Argument should be converted to array [1, 2, 3]'
    );
  });

  it('should return empty array for argument without value', () => {
    const args = ['--array'];
    const result = argToArray('array', '--', args);
    assert.deepStrictEqual(
      result,
      [],
      'Argument should be converted to an empty array'
    );
  });

  it('should return undefined for non-existing argument to array', () => {
    const args: string[] = [];
    const result = argToArray('array', '--', args);
    assert.strictEqual(result, undefined, 'Argument should be undefined');
  });

  it('should return paths without prefix arguments', () => {
    const args = ['--arg=value', 'path1', 'path2'];
    const result = getPaths('--', args);
    assert.deepStrictEqual(
      result,
      ['path1', 'path2'],
      'Should return ["path1", "path2"]'
    );
  });

  it('should split paths by comma', () => {
    const args = ['path1,path2,path3'];
    const result = getPaths('--', args);
    assert.deepStrictEqual(
      result,
      ['path1', 'path2', 'path3'],
      'Should split paths by comma'
    );
  });

  it('should return undefined if no paths provided', () => {
    const args = ['--arg=value'];
    const result = getPaths('--', args);
    assert.strictEqual(
      result,
      undefined,
      'Should return undefined if no paths'
    );
  });

  it('should handle mixed arguments with and without prefix', () => {
    const args = ['--arg=value', 'path1', '--another=value', 'path2,path3'];
    const result = getPaths('--', args);
    assert.deepStrictEqual(
      result,
      ['path1', 'path2', 'path3'],
      'Should return ["path1", "path2", "path3"]'
    );
  });

  it('should handle empty array', () => {
    const args: string[] = [];
    const result = getPaths('--', args);
    assert.strictEqual(
      result,
      undefined,
      'Should return undefined for empty array'
    );
  });
});
