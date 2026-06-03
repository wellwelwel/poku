# Database Testing with Poku and pg (PostgreSQL)

> End-to-end example of testing a PostgreSQL database with Poku and the pg driver, from installing the driver to spinning the database up with Docker Compose.

Open the connection in an outer `describe`, put every assertion inside its own `it`, and close the connection at the end of that same `describe`, so cleanup always runs regardless of what an individual assertion does. The container lifecycle lives in a [`poku.config.js`](https://poku.io/docs/documentation/poku/config-files) anonymous plugin that uses [`@pokujs/docker`](https://poku.io/docs/documentation/helpers/containers) to run `setup` before the suite and `teardown` after it, so the suite runs with a plain `npm test`.

## Install

```bash
npm i pg
```

```bash
npm i -D poku tsx @pokujs/docker @types/pg
```

## Configure the credentials

`.env.test`:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=app
```

`.gitignore`:

```bash
.env.test
```

## Start the database

`docker-compose.yml` reads the same `.env.test` to configure the container:

```yaml
services:
  postgres:
    image: postgres:18
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - '${DB_PORT}:5432'
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U ${DB_USER} -d ${DB_NAME}']
      interval: 5s
      timeout: 5s
      retries: 10
      start_period: 30s

  db-ready:
    image: busybox
    command: ['tail', '-f', '/dev/null']
    depends_on:
      postgres:
        condition: service_healthy
```

## Connect

`db.ts` reads every access from `process.env`:

```ts
import { Client } from 'pg';

export const connect = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();

  return client;
};
```

## Write the test

`users.test.ts`:

```ts
import { describe, it, assert } from 'poku';
import { connect } from './db.js';

await describe('Users table', async () => {
  const client = await connect();

  await describe('Seed', async () => {
    await client.query(
      'CREATE TEMP TABLE users (id INT PRIMARY KEY, name TEXT)'
    );
    await client.query('INSERT INTO users (id, name) VALUES (1, $1)', ['Poku']);
  });

  await it('reads the inserted user', async () => {
    const result = await client.query<{ name: string }>(
      'SELECT name FROM users WHERE id = $1',
      [1]
    );

    assert.strictEqual(
      result.rows[0].name,
      'Poku',
      'The inserted user is returned'
    );
  });

  await client.end();
});
```

## Configure Poku

`poku.config.js`:

```js
import { defineConfig } from 'poku';
import { docker } from '@pokujs/docker';

const compose = docker.compose({ envFile: '.env.test' });

export default defineConfig({
  envFile: '.env.test',
  plugins: [
    {
      setup: () => compose.up(),
      teardown: () => compose.down(),
    },
  ],
});
```

- Configuring Poku is optional: you can orchestrate your containers however you prefer and run Poku as `poku --envFile='.env.test'`, for example. In that case, `@pokujs/docker` is not needed.

## Run

Add the `test` script to `package.json`:

```json
{
  "scripts": {
    "test": "poku"
  }
}
```

Then run it:

```bash
npm test
```
