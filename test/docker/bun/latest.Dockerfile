FROM oven/bun:alpine

WORKDIR /usr/app

COPY ./ci ./
COPY ./fixtures/server/bun.json ./fixtures/server/package.json

RUN apk add lsof

CMD ["bun", "test/run.test.js"]
