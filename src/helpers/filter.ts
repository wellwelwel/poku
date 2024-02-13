import { escapeRegExp } from './escape-reg-exp.js';

export const filter = process.env.FILTER?.trim()
  ? new RegExp(escapeRegExp(process.env.FILTER), 'i')
  : null;
