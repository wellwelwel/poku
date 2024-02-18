FROM node:11-alpine

WORKDIR /usr/app

COPY ./ci ./

CMD ["node", "test/run.test.js"]
