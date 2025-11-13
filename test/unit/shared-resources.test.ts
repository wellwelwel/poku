import type {
  IPCEventEmitter,
  IPCGetMessage,
  IPCRemoteProcedureCallMessage,
  IPCRemoteProcedureCallResultMessage,
  IPCResourceNotFoundMessage,
  IPCResourceResultMessage,
  IPCResourceUpdatedMessage,
  SharedResourceEntry,
} from '../../src/@types/shared-resources.js';
import EventEmitter from 'node:events';
import { env } from 'node:process';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it/core.js';
import {
  assertSharedResourcesActive,
  constructSharedResourceWithRPCs,
  createSharedResource,
  extractFunctionNames,
  handleGetResource,
  handleRemoteProcedureCall,
  setupSharedResourceIPC,
  SHARED_RESOURCE_MESSAGE_TYPES,
} from '../../src/modules/helpers/shared-resources.js';
import { sleep } from '../../src/modules/helpers/wait-for.js';

describe(async () => {
  await describe('createSharedResource', async () => {
    await it('should create a shared resource', async () => {
      const { entry, name } = await createSharedResource('test', () => ({
        value: 42,
      }));

      assert.deepStrictEqual(entry.state, { value: 42 });
      assert.deepStrictEqual(name, 'test');
    });

    await it('should create a shared resource with async factory', async () => {
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

  describe('extractFunctionNames', () => {
    it('should return function names from an object', () => {
      const obj = {
        methodA: () => {},
        methodB: () => {},
        methodC: () => {},
      };

      const result = extractFunctionNames(obj);
      assert.deepStrictEqual(result, ['methodA', 'methodB', 'methodC']);
    });

    it('should should return an empty array for non-function properties', () => {
      const obj = {
        methodA: () => {},
        propB: 'not a function',
        methodC: () => {},
      };

      const result = extractFunctionNames(obj);
      assert.deepStrictEqual(result, ['methodA', 'methodC']);
    });

    it('should should return function names from an object prototype', () => {
      class MessageStore {
        messages: string[] = [];
        addMessage(msg: string) {
          this.messages.push(msg);
        }
      }

      class MessageStoreExtended extends MessageStore {
        clearMessages() {
          this.messages = [];
        }
      }

      const resource = new MessageStoreExtended();
      const rpcs = extractFunctionNames(
        resource as unknown as Record<string, unknown>
      );

      assert.deepStrictEqual(
        rpcs.sort(),
        ['addMessage', 'clearMessages'],
        'RPCs should include all methods from the prototype chain'
      );
    });
  });

  await describe('constructSharedResourceWithRPCs', async () => {
    await it('should  create a shared resource with RPCs for sync functions', async () => {
      const resource = {
        messages: [] as string[],
        addMessage: function (msg: string) {
          this.messages.push(msg);
        },
      };

      const sharedResource = constructSharedResourceWithRPCs(
        resource,
        extractFunctionNames(resource),
        'testResource'
      );

      assert.ok(sharedResource.addMessage instanceof Function);
      assert.ok(
        sharedResource.addMessage.toString().includes('remoteProcedureCall')
      );
    });

    it('should  create a shared resource with RPCs for async functions', () => {
      const resource = {
        messages: [] as string[],
        addMessage: async function (msg: string) {
          await sleep(1);
          this.messages.push(msg);
        },
      };

      const sharedResource = constructSharedResourceWithRPCs(
        resource,
        extractFunctionNames(resource),
        'testResource'
      );

      assert.ok(sharedResource.addMessage instanceof Function);
      assert.ok(
        sharedResource.addMessage.toString().includes('remoteProcedureCall')
      );
    });
  });

  class IPCEventEmitterMock extends EventEmitter implements IPCEventEmitter {
    sentMessages: unknown[] = [];
    onceEvents: Record<string, () => void> = {};
    send(message: unknown, ..._: unknown[]): boolean {
      this.sentMessages.push(message);
      return true;
    }

    once(event: string, listener: (...args: unknown[]) => void): this {
      this.onceEvents[event] = listener;
      return this;
    }
  }

  await describe('handleGetResource', async () => {
    await it('should send RESOURCE_RESULT if resource exists', async () => {
      const resource = { foo: 123, bar: () => 42 };
      const entry: SharedResourceEntry<typeof resource> = {
        state: resource,
        subscribers: new Set(),
      };
      const registry = { testResource: entry };
      const child = new IPCEventEmitterMock();
      const message = {
        type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
        name: 'testResource',
        id: 'abc123',
      };

      await handleGetResource(message, registry, child as IPCEventEmitter);

      const sent = child.sentMessages[0] as IPCResourceResultMessage;
      assert.strictEqual(
        sent.type,
        SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_RESULT
      );
      assert.strictEqual(sent.name, 'testResource');
      assert.deepStrictEqual(sent.value, resource);
      assert.deepStrictEqual(sent.rpcs, extractFunctionNames(resource));
    });

    await it('should send RESOURCE_NOT_FOUND if resource does not exist', async () => {
      const registry = {};
      const child = new IPCEventEmitterMock();
      const message = {
        type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
        name: 'missingResource',
        id: 'id1',
      };

      await handleGetResource(message, registry, child);

      const sent = child.sentMessages[0] as IPCResourceNotFoundMessage;
      assert.strictEqual(
        sent.type,
        SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_NOT_FOUND
      );
      assert.strictEqual(sent.name, 'missingResource');
    });

    await it('should add a subscriber and send RESOURCE_UPDATED on state change', async () => {
      const resource = {
        foo: 1,
        inc() {
          this.foo++;
        },
      };
      const entry: SharedResourceEntry<typeof resource> = {
        state: resource,
        subscribers: new Set(),
      };
      const registry = { testResource: entry };
      const child = new IPCEventEmitterMock();
      const message = {
        type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
        name: 'testResource',
        id: 'id2',
      };

      await handleGetResource(message, registry, child);

      // There should be one subscriber added
      assert.strictEqual(entry.subscribers.size, 1);

      // Simulate a state update and notify subscribers
      resource.foo = 42;
      for (const sub of entry.subscribers) {
        sub(resource);
      }

      // The last message should be RESOURCE_UPDATED
      const sent = child.sentMessages[1] as IPCResourceUpdatedMessage;
      assert.strictEqual(
        sent.type,
        SHARED_RESOURCE_MESSAGE_TYPES.RESOURCE_UPDATED
      );
      assert.strictEqual(sent.name, 'testResource');
      assert.deepStrictEqual(sent.value, resource);
      assert.deepStrictEqual(sent.rpcs, extractFunctionNames(resource));
    });

    await it('should remove subscriber on exit or disconnect', async () => {
      const resource = { foo: 1 };
      const entry: SharedResourceEntry<typeof resource> = {
        state: resource,
        subscribers: new Set(),
      };
      const registry = { testResource: entry };
      const child = new IPCEventEmitterMock();
      const message = {
        type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
        name: 'testResource',
        id: 'id3',
      };

      await handleGetResource(message, registry, child);

      assert.strictEqual(entry.subscribers.size, 1);

      // Simulate exit event
      child.onceEvents.exit();
      assert.strictEqual(entry.subscribers.size, 0);

      // Add again and simulate disconnect event
      await handleGetResource(message, registry, child);
      assert.strictEqual(entry.subscribers.size, 1);
      child.onceEvents.disconnect();
      assert.strictEqual(entry.subscribers.size, 0);
    });
  });

  await describe('handleRemoteProcedureCall', async () => {
    await it('should do nothing if resource does not exist', async () => {
      const registry = {};
      const child = new IPCEventEmitterMock();
      const message = {
        type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
        name: 'missingResource',
        method: 'foo',
        args: [],
        id: 'id1',
      };

      await handleRemoteProcedureCall(message, registry, child);

      assert.strictEqual(child.sentMessages.length, 0);
    });

    await it('should do nothing if method does not exist', async () => {
      const resource = { foo: 1 };
      const entry: SharedResourceEntry<typeof resource> = {
        state: resource,
        subscribers: new Set(),
      };
      const registry = { testResource: entry };
      const child = new IPCEventEmitterMock();
      const message = {
        type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
        name: 'testResource',
        method: 'bar', // not present
        args: [],
        id: 'id2',
      };

      await handleRemoteProcedureCall(message, registry, child);

      assert.strictEqual(child.sentMessages.length, 0);
    });

    await it('should do nothing if method is not a function', async () => {
      const resource = { foo: 1, bar: 42 };
      const entry: SharedResourceEntry<typeof resource> = {
        state: resource,
        subscribers: new Set(),
      };
      const registry = { testResource: entry };
      const child = new IPCEventEmitterMock();
      const message = {
        type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
        name: 'testResource',
        method: 'bar', // not a function
        args: [],
        id: 'id3',
      };

      await handleRemoteProcedureCall(message, registry, child);

      assert.strictEqual(child.sentMessages.length, 0);
    });

    await it('should call sync method and notify subscribers and send result', async () => {
      const resource = {
        foo: 1,
        inc(n: number) {
          this.foo += n;
          return this.foo;
        },
      };
      let notified = false;
      const entry: SharedResourceEntry<typeof resource> = {
        state: resource,
        subscribers: new Set([
          () => {
            notified = true;
          },
        ]),
      };
      const registry = { testResource: entry };
      const child = new IPCEventEmitterMock();
      const message = {
        type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
        name: 'testResource',
        method: 'inc',
        args: [2],
        id: 'id4',
      };

      await handleRemoteProcedureCall(message, registry, child);

      assert.strictEqual(resource.foo, 3);
      assert.strictEqual(notified, true);
      const sent = child
        .sentMessages[0] as IPCRemoteProcedureCallResultMessage<{
        result: number;
        latest: typeof resource;
      }>;

      assert.strictEqual(
        sent.type,
        SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT
      );
      assert.strictEqual(sent.id, 'id4');
      assert.ok(sent.value, 'Value should be defined');
      assert.deepStrictEqual(sent.value!.result, 3);
      assert.deepStrictEqual(sent.value!.latest, resource);
    });

    await it('should call async method and notify subscribers and send result', async () => {
      const resource = {
        foo: 1,
        async inc(n: number) {
          await sleep(1);
          this.foo += n;
          return this.foo;
        },
      };
      let notified = false;
      const entry: SharedResourceEntry<typeof resource> = {
        state: resource,
        subscribers: new Set([
          () => {
            notified = true;
          },
        ]),
      };
      const registry = { testResource: entry };
      const child = new IPCEventEmitterMock();
      const message = {
        type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
        name: 'testResource',
        method: 'inc',
        args: [5],
        id: 'id5',
      };

      await handleRemoteProcedureCall(message, registry, child);

      assert.strictEqual(resource.foo, 6);
      assert.strictEqual(notified, true);
      const sent = child
        .sentMessages[0] as IPCRemoteProcedureCallResultMessage<{
        result: number;
        latest: typeof resource;
      }>;

      assert.strictEqual(
        sent.type,
        SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL_RESULT
      );
      assert.strictEqual(sent.id, 'id5');
      assert.ok(sent.value, 'Value should be defined');
      assert.deepStrictEqual(sent.value!.result, 6, 'Result should be 6');
      assert.deepStrictEqual(
        sent.value!.latest,
        resource,
        'Latest should match resource'
      );
    });
  });

  describe('setupSharedResourceIPC', () => {
    it('should set up IPC handlers for shared resources', () => {
      const registry: Record<string, SharedResourceEntry<unknown>> = {};
      const child = new IPCEventEmitterMock();
      setupSharedResourceIPC(child, registry);

      child.send({
        type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
        name: 'testResource',
        id: 'id6',
      } as IPCGetMessage);

      child.send({
        type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
        name: 'testResource',
        id: 'id6',
        args: [42],
        method: 'inc',
      } as IPCRemoteProcedureCallMessage);

      assert.strictEqual(child.sentMessages.length, 2);

      assert.deepStrictEqual(child.sentMessages[0], {
        type: SHARED_RESOURCE_MESSAGE_TYPES.GET_RESOURCE,
        name: 'testResource',
        id: 'id6',
      } as IPCGetMessage);

      assert.deepStrictEqual(child.sentMessages[1], {
        type: SHARED_RESOURCE_MESSAGE_TYPES.REMOTE_PROCEDURE_CALL,
        name: 'testResource',
        id: 'id6',
        args: [42],
        method: 'inc',
      } as IPCRemoteProcedureCallMessage);
    });
  });

  describe('assertSharedResourcesActive', () => {
    const original = env.POKU_SHARED_RESOURCES;

    it('should not throw if shared resources are enabled', () => {
      env.POKU_SHARED_RESOURCES = '1';
      assert.doesNotThrow(assertSharedResourcesActive);

      env.POKU_SHARED_RESOURCES = original;
    });

    it('should throw if shared resources are not enabled', () => {
      env.POKU_SHARED_RESOURCES = undefined;
      assert.throws(assertSharedResourcesActive);

      env.POKU_SHARED_RESOURCES = original;
    });
  });
});
