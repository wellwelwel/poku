FROM oven/bun:0.5.3

WORKDIR /usr/app

COPY ./ci ./

CMD ["bun", "test/run.test.js"]
