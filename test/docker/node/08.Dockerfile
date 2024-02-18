FROM node:8-alpine

WORKDIR /usr/app

COPY ./ci ./

CMD ["node", "test/run.test.js"]
