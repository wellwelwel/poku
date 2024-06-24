FROM node:11-alpine

WORKDIR /usr/app

COPY ./ci ./
COPY ./fixtures/server/package.json ./fixtures/server/package.json

RUN apk add lsof

CMD ["node", "test/run.test.js"]
