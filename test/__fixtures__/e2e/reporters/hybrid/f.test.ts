import { describe } from '../../../../../src/modules/helpers/describe.js';

describe('Describing a Title');

describe.todo('Describing a Todo');
// @ts-expect-error
describe.todo();
describe.skip('Skipping a describe', () => {});
