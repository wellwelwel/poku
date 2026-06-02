import { readFile } from 'node:fs/promises';
import { assert } from '../../src/modules/essentials/assert.js';
import { describe } from '../../src/modules/helpers/describe.js';
import { it } from '../../src/modules/helpers/it.js';

const MAX_RULES = 50;
const MAX_RULE_LENGTH = 255;
const MAX_DESCRIPTION_LENGTH = 200;

const { description, rules } = JSON.parse(
  await readFile('./context7.json', 'utf8')
);

describe('Respects Context7 specifications', () => {
  it(() => {
    assert.strictEqual(
      description.length <= MAX_DESCRIPTION_LENGTH,
      true,
      `description: ${description.length}/${MAX_DESCRIPTION_LENGTH}`
    );
  });

  it(() => {
    assert.strictEqual(
      rules.length <= MAX_RULES,
      true,
      `rules length should not exceed ${MAX_RULES}`
    );
  });

  for (let index = 0; index < rules.length; index++) {
    const rule = rules[index];

    it(() => {
      assert.strictEqual(
        rule.length <= MAX_RULE_LENGTH,
        true,
        `rule ${index}: ${rule.length}/${MAX_RULE_LENGTH}`
      );
    });
  }
});
