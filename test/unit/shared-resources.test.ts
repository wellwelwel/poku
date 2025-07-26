import type { IPCEventEmitter } from '../../src/modules/helpers/shared-resources.js';
import { EventEmitter } from 'node:events';
import { assert } from '../../src/modules/essentials/assert.js';
import {
  constructSharedResourceWithRPCs,
  createSharedResource,
  extractFunctionNames,
  getSharedResourceFactory,
  remoteProcedureCallFactory,
} from '../../src/modules/helpers/shared-resources.js';
import { test } from '../../src/modules/helpers/test.js';

class MockProcess extends EventEmitter implements IPCEventEmitter {
  sent: unknown[] = [];
  send(msg: unknown) {
    this.sent.push(msg);
    setImmediate(() => this.emit('message', msg));
    return true;
  }
  off = this.removeListener;
  on = this.addListener;
}

test('createSharedResource should create a shared resource', () => {
  const { entry, name } = createSharedResource('test', () => ({ value: 42 }));
  assert.deepStrictEqual(entry.state, { value: 42 });
  assert.deepStrictEqual(name, 'test');
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

test('getSharedResourceFactory should return a function', () => {
  const mockProcess = new MockProcess();
  const getSharedResource = getSharedResourceFactory(mockProcess);
  assert.strictEqual(typeof getSharedResource, 'function');
});

test('remoteProcedureCallFactory should return a function', () => {
  const remoteProcedureCall = remoteProcedureCallFactory();
  assert.strictEqual(typeof remoteProcedureCall, 'function');
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
