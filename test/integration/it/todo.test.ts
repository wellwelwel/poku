import { describe } from '../../../src/modules/helpers/describe.js';
import { it } from '../../../src/modules/helpers/it.js';

describe('Testing "it.todo" overloads', () => {
  it.todo('Basic todo');
  it.todo(
    'Ignore callback',
    async () => await new Promise((_, reject) => reject(undefined))
  );
});
