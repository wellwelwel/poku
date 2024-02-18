FROM node:9-alpine

WORKDIR /usr/app

COPY ./ci ./

CMD ["node", "test/run.test.js"]
