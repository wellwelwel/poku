FROM denoland/deno:alpine

WORKDIR /usr/app

COPY ./lib ./lib
COPY ./src ./src
COPY ./test ./test
COPY ./tools ./tools
COPY ./fixtures ./fixtures

RUN apk add lsof
RUN deno run --allow-read --allow-write --allow-env --allow-run --unstable-sloppy-imports tools/compatibility/deno.ts

CMD ["deno", "run", "--allow-read", "--allow-write", "--allow-hrtime", "--allow-env", "--allow-run", "test/run.test.ts"]
