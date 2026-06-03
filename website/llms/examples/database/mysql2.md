# Database Testing with Poku and mysql2 (MySQL)

> End-to-end example of testing a MySQL database with Poku and the mysql2 driver, from installing the driver to spinning the database up with Docker Compose.

Open the connection in an outer `describe`, put every assertion inside its own `it`, and close the connection at the end of that same `describe`, so cleanup always runs regardless of what an individual assertion does. The container lifecycle lives in a [`poku.config.js`](https://poku.io/docs/documentation/poku/config-files) anonymous plugin that uses [`@pokujs/docker`](https://poku.io/docs/documentation/helpers/containers) to run `setup` before the suite and `teardown` after it, so the suite runs with a plain `npm test`.

## Install

```bash
npm i mysql2
npm i -D poku tsx @pokujs/docker
```

## Configure the credentials

`.env.test`:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
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
  mysql:
    image: mysql:lts
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
    ports:
      - '${DB_PORT}:3306'
    healthcheck:
      test: ['CMD', 'mysqladmin', 'ping', '-h', '127.0.0.1']
      interval: 5s
      timeout: 5s
      retries: 10
      start_period: 30s

  db-ready:
    image: busybox
    command: ['tail', '-f', '/dev/null']
    depends_on:
      mysql:
        condition: service_healthy
```

## Connect

`db.ts` reads every access from `process.env`:

```ts
import { createConnection } from 'mysql2/promise';

export const connect = () =>
  createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
```

## Write the test

`users.test.ts`:

```ts
import type { RowDataPacket } from 'mysql2/promise';
import { describe, it, assert } from 'poku';
import { connect } from './db.js';

await describe('Users table', async () => {
  const connection = await connect();

  await describe('Seed', async () => {
    await connection.execute(
      'CREATE TEMPORARY TABLE users (id INT PRIMARY KEY, name VARCHAR(100))'
    );
    await connection.execute('INSERT INTO users (id, name) VALUES (1, ?)', [
      'Poku',
    ]);
  });

  await it('reads the inserted user', async () => {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT name FROM users WHERE id = ?',
      [1]
    );

    assert.strictEqual(rows[0].name, 'Poku', 'The inserted user is returned');
  });

  await connection.end();
});
```

## Configure Poku (optional)

> Configuring Poku is entirely optional. You can orchestrate your containers however you prefer and run Poku as `poku --envFile='.env.test'`, for example. In that case, `@pokujs/docker` is not needed.

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
