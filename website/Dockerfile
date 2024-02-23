FROM oven/bun:alpine

WORKDIR /usr/app

COPY ./build ./build
COPY ./server.ts ./server.ts

CMD ["bun", "server.ts"]
