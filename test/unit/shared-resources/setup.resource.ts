import { createSharedResource } from '../../../src/modules/index.js';

export const sharedResourceKey = 'sharedResource';

export type SharedResourceType = {
  messages: string[];
  addMessage: (message: string) => void;
  removeMessage: (message: string) => void;
  resetMessages: () => void;
};

export function SharedResource() {
  const messages: string[] = [];

  return {
    messages,
    addMessage(message: string) {
      messages.push(message);
    },
    removeMessage(message: string) {
      const index = messages.indexOf(message);
      if (index > -1) {
        messages.splice(index, 1);
      }
    },
    resetMessages() {
      messages.length = 0;
    },
  };
}

// biome-ignore lint/style/noDefaultExport: <explanation>
export default createSharedResource(
  sharedResourceKey,
  () => SharedResource(),
  (state, action) => {
    const { type, payload } = action;

    if (type === 'ADD_MESSAGE' && payload) {
      state.addMessage(payload as string);
    }

    if (type === 'DELETE_MESSAGE' && payload) {
      state.removeMessage(payload as string);
    }

    if (type === 'RESET_MESSAGES') {
      state.resetMessages();
    }

    return state;
  }
);
