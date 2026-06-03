# Database Testing with Poku and Sequelize

> End-to-end example of testing Poku and the Sequelize ORM, from installing the driver to spinning the database up with Docker Compose.

Open the connection in an outer `describe`, put every assertion inside its own `it`, and close the connection at the end of that same `describe`, so cleanup always runs regardless of what an individual assertion does. A single-connection pool keeps every statement on the same connection, which a temporary table requires. The container lifecycle lives in a [`poku.config.js`](https://poku.io/docs/documentation/poku/config-files) anonymous plugin that uses [`@pokujs/docker`](https://poku.io/docs/documentation/helpers/containers) to run `setup` before the suite and `teardown` after it, so the suite runs with a plain `npm test`.

## Install

```bash
npm i sequelize pg pg-hstore
```

```bash
npm i -D poku tsx @pokujs/docker
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

## Define the model and connection

`db.ts` reads every access from `process.env`:

```ts
import { DataTypes, Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
    pool: { min: 1, max: 1 },
  }
);

export const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.TEXT, allowNull: false },
  },
  { tableName: 'users', timestamps: false }
);
```

## Write the test

`users.test.ts`:

```ts
import { describe, it, assert } from 'poku';
import { User, sequelize } from './db.js';

await describe('Users table', async () => {
  await describe('Seed', async () => {
    await sequelize.query(
      'CREATE TEMP TABLE users (id INT PRIMARY KEY, name TEXT NOT NULL)'
    );
    await User.create({ id: 1, name: 'Poku' });
  });

  await it('reads the created user', async () => {
    const user = await User.findByPk(1);

    assert.strictEqual(
      user?.get('name'),
      'Poku',
      'The created user is returned'
    );
  });

  await sequelize.close();
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
