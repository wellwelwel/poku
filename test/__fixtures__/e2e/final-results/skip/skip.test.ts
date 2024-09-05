import { exit } from 'node:process';
import { skip } from '../../../../../src/modules/helpers/skip.js';

skip('Some skip');
exit(1);
