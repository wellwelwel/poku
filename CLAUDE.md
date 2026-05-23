# Poku Development Instructions

Poku is an innovative zero-dependency, cross-platform test runner for Node.js, Bun, and Deno that brings the JavaScript essence back to testing.

## Quick Reference

- **Runtimes**: Node.js 16+, Bun 1+, Deno 2+, TypeScript 5+
- **Philosophy**: "JavaScript essence back to testing". No internal test mapping, just execution reporting. This means `describe`/`it`/`test` use native `async`/`await` as plain JS, no `beforeAll`/`afterAll` hooks needed, just write sequential code naturally.
- **Build**: TypeScript 6.x → ES2021, Node16 modules (`src/` → `lib/`)
- **Lint**: Biome (strict, `biome.jsonc`) + Prettier

## Basic Usage Patterns

### Synchronous tests (no `await` needed)

```ts
describe('Sync', () => {
  it('checks value', () => {
    assert.strictEqual(1 + 1, 2);
  });
});
```

### Asynchronous tests (use `await`)

Await the async `it` so `describe` waits for it to finish:

```ts
await describe('Async', async () => {
  await it('fetches data', async () => {
    const res = await fetch('http://localhost:3000');

    assert.strictEqual(res.status, 200);
  });
});
```

Also, you can use a "global" `describe` group to avoid top-await in CommonJS tests:

```ts
describe(async () => {
  await it(async () => {});
});
```

### Equivalent to `beforeAll` / `afterAll` approaches (just sequential code)

```ts
await describe('Server tests', async () => {
  // no "before all" approach needed
  const server = await startService('server.ts', { startAfter: 'ready' });

  await it('responds 200', async () => {
    const res = await fetch('http://localhost:3000');

    assert.strictEqual(res.status, 200);
  });

  await it('returns JSON', async () => {
    const res = await fetch('http://localhost:3000/api');
    const body = await res.json();

    assert.ok(body.success);
  });

  // no "after all" approach needed
  await server.end(3000);
});
```

## Developer Experience (DX)

ALWAYS preserve or improve the developer experience. See `/engineering` for the DX principles (zero-config, actionable errors, visual clarity, output filtering, fluent formatter, etc.). See `/architecture` when separating responsibilities, deciding directories, file names, or where a new module should live.

## Testing

Suites live under `test/` (unit, integration, e2e, compatibility). See `/testing` for structure, fixtures, utils, coverage, and how to run them.

## Documentation

- **When to update**: Change docs only when user-facing behavior changes
- **Language**: English is mandatory. Use i18n (`website/i18n/`) only on explicit user request
- **Punctuation**: Use proper punctuation. Never use any kind of substitute as a crutch
- **Consistency**: Match the writing style, tone, and structure of the related existing docs

See `/documentation` for framework, feature-to-docs mapping, conventions, and components.

## Before committing

See `/pre-commit` for the pre-commit workflow contract (mandatory checks, runtime-sensitive checks, subset execution, and failure modes).

## Code Style

- NEVER add comments. Code, organization, logic, and naming MUST be clear enough to make them unnecessary
  - The only exception is a public API exposed directly to the end user, which MAY carry objective inline docs
- In tests, NEVER comment, since `describe`, `it`, `test`, `assert`, and `strict` all accept a message
- NEVER cause side effects on unrelated logic. Keep every change scoped to its intent

## Tips

- When a change touches more than one responsibility, suggest to the user splitting distinct responsibilities into separate Pull Requests for cleaner versioning and a better chance of approval. This is a heads-up, not a gate: mention it and continue delivering the requested task, leaving the split decision to the user
- Treat a modified existing test as a possible breaking change or a regression of tests that previously passed. Prefer adding new tests. Modify an existing test ONLY when truly unavoidable (intentional breaking change, the test was actually wrong, updated snapshots, and similar cases)
- When presenting alternatives or options to the user, ALWAYS include explicit pros and cons (trade-offs) for each. Never offer choices without them

## Deep-Dive Skills

> Skills path: `./.claude/skills/**/SKILL.md`.

Detailed context lives in project skills, invoked automatically when relevant or on demand:

- `/architecture`: project structure, execution flow, config system, competitive context
- `/engineering`: performance patterns, security, build pipeline, CI/CD
- `/testing`: test structure, fixtures, utils, Docker testing, coverage strategy
- `/documentation`: Docusaurus framework, feature-to-docs mapping, conventions, changelog
- `/pre-commit`: recommendations and useful instructions before committing
