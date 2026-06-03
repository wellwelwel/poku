# Database Testing with Poku and TypeORM

> End-to-end example of testing Poku and the TypeORM ORM, from installing the driver to spinning the database up with Docker Compose.

Open the connection in an outer `describe`, put every assertion inside its own `it`, and destroy the data source at the end of that same `describe`, so cleanup always runs regardless of what an individual assertion does. `synchronize` creates a permanent schema shared across files, so the suite runs with `sequential` to keep the data deterministic. The container lifecycle lives in a [`poku.config.js`](https://poku.io/docs/documentation/poku/config-files) anonymous plugin that uses [`@pokujs/docker`](https://poku.io/docs/documentation/helpers/containers) to run `setup` before the suite and `teardown` after it, so the suite runs with a plain `npm test`.

## Install

```bash
npm i typeorm pg reflect-metadata
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

## Enable decorators

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
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

## Define the entity and connection

`user.entity.ts`:

```ts
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;
}
```

`db.ts` reads every access from `process.env`:

```ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user.entity.js';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
});
```

## Write the test

`users.test.ts`:

```ts
import { describe, it, assert } from 'poku';
import { dataSource } from './db.js';
import { User } from './user.entity.js';

await describe('User entity', async () => {
  await dataSource.initialize();
  const users = dataSource.getRepository(User);

  await describe('Seed', async () => {
    await users.save({ id: 1, name: 'Poku' });
  });

  await it('reads the saved user', async () => {
    const user = await users.findOneBy({ id: 1 });

    assert.strictEqual(user?.name, 'Poku', 'The saved user is returned');
  });

  await dataSource.destroy();
});
```

## Configure Poku (optional)

> Configuring Poku is entirely optional. You can orchestrate your containers however you prefer and run Poku as `poku --envFile='.env.test' --sequential`, for example. In that case, `@pokujs/docker` is not needed.

`poku.config.js`:

```js
import { defineConfig } from 'poku';
import { docker } from '@pokujs/docker';

const compose = docker.compose({ envFile: '.env.test' });

export default defineConfig({
  envFile: '.env.test',
  sequential: true,
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
