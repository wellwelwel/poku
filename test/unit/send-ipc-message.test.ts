import { EventEmitter } from 'node:events';
import { assert } from '../../src/modules/essentials/assert.js';
import { sendIPCMessage } from '../../src/modules/helpers/shared-resources.js';
import { test } from '../../src/modules/helpers/test.js';

type MockMessage = { id: string; success?: boolean };

test('sendIPCMessage', async () => {
  await test('should resolve when a valid response is received', async () => {
    const emitter = new EventEmitter();
    const sender = (msg: unknown) => {
      const m = msg as MockMessage;
      // Simulate response after a short delay
      setTimeout(() => {
        emitter.emit('message', { id: m.id, success: true });
      }, 10);
    };

    const result = await sendIPCMessage<MockMessage>({
      message: { id: '123' },
      validator: (msg): msg is MockMessage => (msg as MockMessage).id === '123',
      emitter,
      sender,
    });

    assert.deepStrictEqual(
      result,
      { id: '123', success: true },
      'Resolved with correct response'
    );
  });

  await test('should ignore invalid responses', async () => {
    const emitter = new EventEmitter();
    const sender = (msg: unknown) => {
      const m = msg as MockMessage;
      setTimeout(() => {
        emitter.emit('message', { id: 'other', success: false }); // Should be ignored
        setTimeout(() => {
          emitter.emit('message', { id: m.id, success: true }); // Should be accepted
        }, 10);
      }, 10);
    };

    const result = await sendIPCMessage<MockMessage>({
      message: { id: '456' },
      validator: (msg): msg is MockMessage => (msg as MockMessage).id === '456',
      emitter,
      sender,
    });

    assert.deepStrictEqual(
      result,
      { id: '456', success: true },
      'Resolved with correct response after ignoring invalid one'
    );
  });

  await test('should reject on timeout', async () => {
    const emitter = new EventEmitter();
    const sender = () => {}; // Do nothing

    try {
      await sendIPCMessage<MockMessage>({
        message: { id: '789' },
        validator: (msg): msg is MockMessage =>
          (msg as MockMessage).id === '789',
        timeout: 50,
        emitter,
        sender,
      });
      assert.fail('Should have rejected');
    } catch (error) {
      assert.match(
        (error as Error).message,
        /timed out/,
        'Rejected with timeout error'
      );
    }
  });

  await test('should reject if sender throws', async () => {
    const emitter = new EventEmitter();
    const sender = () => {
      throw new Error('Send failed');
    };

    try {
      await sendIPCMessage<MockMessage>({
        message: { id: 'abc' },
        validator: (msg): msg is MockMessage => true,
        emitter,
        sender,
      });
      assert.fail('Should have rejected');
    } catch (error) {
      assert.strictEqual(
        (error as Error).message,
        'Send failed',
        'Rejected with sender error'
      );
    }
  });

  await test('should cleanup listeners', async () => {
    const emitter = new EventEmitter();
    const sender = (msg: unknown) => {
      const m = msg as MockMessage;
      setTimeout(() => {
        emitter.emit('message', { id: m.id });
      }, 10);
    };

    await sendIPCMessage<MockMessage>({
      message: { id: 'cleanup' },
      validator: (msg): msg is MockMessage =>
        (msg as MockMessage).id === 'cleanup',
      emitter,
      sender,
    });

    assert.strictEqual(
      emitter.listenerCount('message'),
      0,
      'Listener removed after success'
    );
  });
});
