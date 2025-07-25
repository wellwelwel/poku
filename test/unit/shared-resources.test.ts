import type { IPCEventEmitter } from '../../src/modules/helpers/shared-resources.js';
import { EventEmitter } from 'node:events';
import {
  createSharedResource,
  extractFunctionNames,
  getSharedResourceFactory,
  remoteProcedureCallFactory,
} from '../../src/modules/helpers/shared-resources.js';
import { assert, test } from '../../src/modules/index.js';

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

// test('should call events on IPCEventEmitter', () => {
//   const mockProcess = new MockProcess();
//   const remoteProcedureCall = remoteProcedureCallFactory(mockProcess);
//   remoteProcedureCall<
//     {
//       testMethod: (args: number[]) => string;
//     },
//     'testMethod'
//   >('testResource', 'testMethod', [1, 2, 3]);

//   assert.strictEqual(mockProcess.sent.length, 1);
//   const message = mockProcess.sent[0];
//   assert.strictEqual(message.type, 'shared_resources_remoteProcedureCall');
//   assert.strictEqual(message.name, 'testResource');
//   assert.strictEqual(message.method, 'testMethod');
// });
