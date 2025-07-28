import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import {
  constructSharedResourceWithRPCs,
  createSharedResource,
  extractFunctionNames,
} from '../../src/modules/helpers/shared-resources.js';
import { test } from '../../src/modules/helpers/test.js';
import { sleep } from '../../src/modules/helpers/wait-for.js';

describe('createSharedResource', () => {
  it('should create a shared resource', async () => {
    const { entry, name } = await createSharedResource('test', () => ({
      value: 42,
    }));

    assert.deepStrictEqual(entry.state, { value: 42 });
    assert.deepStrictEqual(name, 'test');
  });

  it('should create a shared resource with async factory', async () => {
    const { entry, name } = await createSharedResource(
      'asyncTest',
      async () => {
        await sleep(100);
        return { value: 42 };
      }
    );

    assert.deepStrictEqual(entry.state, { value: 42 });
    assert.deepStrictEqual(name, 'asyncTest');
  });
});

test('extractFunctionNames should return function names from an object', () => {
  const obj = {
    methodA: () => {},
    methodB: () => {},
    methodC: () => {},
  };

  const result = extractFunctionNames(obj);
  assert.deepStrictEqual(result, ['methodA', 'methodB', 'methodC']);
});

test('extractFunctionNames should return an empty array for non-function properties', () => {
  const obj = {
    methodA: () => {},
    propB: 'not a function',
    methodC: () => {},
  };

  const result = extractFunctionNames(obj);
  assert.deepStrictEqual(result, ['methodA', 'methodC']);
});

test('constructSharedResourceWithRPCs should create a shared resource with RPCs', async () => {
  const resource = {
    messages: [] as string[],
    addMessage: function (msg: string) {
      this.messages.push(msg);
    },
  };

  const rpcs = extractFunctionNames(resource);
  const sharedResource = constructSharedResourceWithRPCs(
    resource,
    rpcs,
    'testResource'
  );

  await assert.rejects(
    // will reject because it won't be able to add messages,
    // Meaning it indeed was transformed into a remote procedure call
    () => sharedResource.addMessage('Hello')
  );

  // the messages array should be empty as it
  // was transformed into a remote procedure call
  assert.deepStrictEqual(sharedResource.messages, []);
});
