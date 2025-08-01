import { createSharedResource } from '../../../../../src/modules/helpers/shared-resources.js';

export const sharedResourceKey = 'sharedResource';

export type SharedResourceType = {
  messages: string[];
  addMessage: (message: string) => string[];
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

export default createSharedResource(sharedResourceKey, () => SharedResource());
