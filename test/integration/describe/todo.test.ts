import { describe } from '../../../src/modules/helpers/describe.js';

describe('Testing "describe.todo" overloads', () => {
  describe.todo('Basic todo');
  describe.todo(
    'Ignore callback',
    async () => await new Promise((_, reject) => reject(undefined))
  );
});
