import { exit } from 'node:process';
import { GLOBAL } from '../../../../src/configs/poku.js';
import { skip } from '../../../../src/modules/helpers/skip.js';

// Mock
GLOBAL.isPoku = false;

skip('Testing');
exit(1);
