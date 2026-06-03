# Database Testing Examples with Poku

> Real, end-to-end database examples for Poku covering mysql2, pg, Prisma, and Drizzle, from installing the driver to spinning the database up with Docker Compose.

Each example follows the same pattern: open the connection in an outer `describe`, put every assertion inside its own `it`, and close the connection at the end of that same `describe`, so cleanup always runs regardless of what an individual assertion does. The container lifecycle lives in a [`poku.config.js`](https://poku.io/docs/documentation/poku/config-files) anonymous plugin that uses [`@pokujs/docker`](https://poku.io/docs/documentation/helpers/containers) to run `setup` before the suite and `teardown` after it, so the suite runs with a plain `npm test`.

---

## mysql2

### Install

```bash
npm i mysql2
npm i -D poku tsx @pokujs/docker
```

### Configure the credentials

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

### Start the database

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
```

### Connect

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

### Write the test

`users.test.ts`:

```ts
import type { RowDataPacket } from 'mysql2/promise';
import { describe, it, assert } from 'poku';
import { connect } from './db.js';

await describe('Users table', async () => {
  const connection = await connect();

  await connection.execute(
    'CREATE TEMPORARY TABLE users (id INT PRIMARY KEY, name VARCHAR(100))'
  );
  await connection.execute('INSERT INTO users (id, name) VALUES (1, ?)', [
    'Poku',
  ]);

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

### Configure Poku (optional)

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

### Run

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

---

## pg

### Install

```bash
npm i pg
npm i -D poku tsx @pokujs/docker @types/pg
```

### Configure the credentials

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

### Start the database

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
```

### Connect

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

### Write the test

`users.test.ts`:

```ts
import { describe, it, assert } from 'poku';
import { connect } from './db.js';

await describe('Users table', async () => {
  const client = await connect();

  await client.query('CREATE TEMP TABLE users (id INT PRIMARY KEY, name TEXT)');
  await client.query('INSERT INTO users (id, name) VALUES (1, $1)', ['Poku']);

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

### Configure Poku (optional)

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

### Run

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

---

## Prisma

### Install

```bash
npm i @prisma/client
npm i -D poku tsx @pokujs/docker prisma
```

### Configure the credentials

`.env.test`:

```bash
DB_USER=postgres
DB_PASSWORD=secret
DB_PORT=5432
DB_NAME=app
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}"
```

`.gitignore`:

```bash
.env.test
```

### Start the database

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
```

### Define the schema

`prisma/schema.prisma` reads the connection string from the environment:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id   Int    @id
  name String
}
```

### Connect

`db.ts`:

```ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
```

### Write the test

`users.test.ts`:

```ts
import { describe, it, assert } from 'poku';
import { prisma } from './db.js';

await describe('User model', async () => {
  await prisma.user.create({ data: { id: 1, name: 'Poku' } });

  await it('reads the created user', async () => {
    const user = await prisma.user.findUnique({ where: { id: 1 } });

    assert.strictEqual(user?.name, 'Poku', 'The created user is returned');
  });

  await prisma.$disconnect();
});
```

### Configure Poku (optional)

> Configuring Poku is entirely optional. You can orchestrate your containers however you prefer and run Poku as `poku --envFile='.env.test' --sequential`, for example. In that case, `@pokujs/docker` is not needed.

`poku.config.js`:

```js
import { execSync } from 'node:child_process';
import { defineConfig } from 'poku';
import { docker } from '@pokujs/docker';

const compose = docker.compose({ envFile: '.env.test' });

export default defineConfig({
  envFile: '.env.test',
  sequential: true,
  plugins: [
    {
      setup: async () => {
        await compose.up();
        execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });
      },
      teardown: () => compose.down(),
    },
  ],
});
```

### Run

Add the `test` script to `package.json`:

```json
{
  "scripts": {
    "test": "poku"
  }
}
```

Then generate the client and run it:

```bash
npx prisma generate
npm test
```

---

## Drizzle

### Install

```bash
npm i drizzle-orm pg
npm i -D poku tsx @pokujs/docker @types/pg
```

### Configure the credentials

`.env.test`:

```bash
DB_USER=postgres
DB_PASSWORD=secret
DB_PORT=5432
DB_NAME=app
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}"
```

`.gitignore`:

```bash
.env.test
```

### Start the database

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
```

### Define the schema and connection

`schema.ts`:

```ts
import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
});
```

`db.ts` reads the connection string from `process.env`. A single `Client`, not a pool, keeps every statement on the same connection, which a temporary table requires:

```ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

export const db = drizzle({ client });
```

### Write the test

`users.test.ts`:

```ts
import { eq, sql } from 'drizzle-orm';
import { describe, it, assert } from 'poku';
import { client, db } from './db.js';
import { users } from './schema.js';

await describe('Users table', async () => {
  await db.execute(
    sql`CREATE TEMP TABLE users (id INT PRIMARY KEY, name TEXT NOT NULL)`
  );
  await db.insert(users).values({ id: 1, name: 'Poku' });

  await it('reads the inserted user', async () => {
    const [user] = await db.select().from(users).where(eq(users.id, 1));

    assert.strictEqual(user.name, 'Poku', 'The inserted user is returned');
  });

  await client.end();
});
```

### Configure Poku (optional)

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

### Run

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
