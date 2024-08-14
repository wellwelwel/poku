FROM node:14-alpine

WORKDIR /usr/app

COPY ./ci ./
COPY ./test/__fixtures__/e2e/server/package.json ./test/__fixtures__/e2e/server/package.json

RUN apk add lsof

CMD ["node", "test/run.test.js"]
