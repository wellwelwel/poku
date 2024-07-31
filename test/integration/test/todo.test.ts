import { describe } from '../../../src/modules/helpers/describe.js';
import { test } from '../../../src/modules/helpers/test.js';

describe('Testing "test.todo" overloads', () => {
  test.todo('Basic todo');
  test.todo(
    'Ignore callback',
    async () => await new Promise((_, reject) => reject(undefined))
  );
});
