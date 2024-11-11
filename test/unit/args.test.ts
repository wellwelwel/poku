import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import { assert } from '../../src/modules/essentials/assert.js';
import { test } from '../../src/parsers/get-arg.js';

const { parseArgs } = test;

describe('CLI Argument Handling Functions', () => {
  it('should get argument value', () => {
    const args = ['--envfile=value'];
    const result = parseArgs(args);
    assert.strictEqual(result.values.envfile, 'value', 'Argument value should be "value"');
  });

  it('should check if argument exists', () => {
    const args = ['--watch'];
    const result = parseArgs(args);
    assert.strictEqual(result.values.watch, true, 'Argument should exist');
  });

  it('should check if argument does not exist', () => {
    const args = ['--watch'];
    const result = parseArgs(args);
    assert.strictEqual(result.values.debug, undefined, 'Argument should not exist');
  });

  it('should return paths without prefix arguments', () => {
    const args = ['--arg=value', 'path1', 'path2'];
    const result = parseArgs(args);
    assert.deepStrictEqual(
      result.positionals,
      ['path1', 'path2'],
      'Should return ["path1", "path2"]'
    );
  });

  it('should split paths by comma', () => {
    const args = ['path1,path2,path3'];
    const result = parseArgs(args);
    assert.deepStrictEqual(
      result.positionals,
      ['path1', 'path2', 'path3'],
      'Should split paths by comma'
    );
  });

  it('should return undefined if no paths provided', () => {
    const args = ['--arg=value'];
    const result = parseArgs(args);
    assert.deepStrictEqual(
      result.positionals,
      [],
      'Should return undefined if no paths'
    );
  });

  it('should handle mixed arguments with and without prefix', () => {
    const args = ['--arg=value', 'path1', '--another=value', 'path2,path3'];
    const result = parseArgs(args);
    assert.deepStrictEqual(
      result.positionals,
      ['path1', 'path2', 'path3'],
      'Should return ["path1", "path2", "path3"]'
    );
  });

  it('should handle empty array', () => {
    const args: string[] = [];
    const result = parseArgs(args);
    assert.deepStrictEqual(
      result.positionals,
      [],
      'Should return undefined for empty array'
    );
  });
});
