FROM oven/bun:alpine

WORKDIR /usr/app

COPY ./ci ./

CMD ["bun", "test/run.test.js"]
