FROM denoland/deno:alpine-1.30.0

WORKDIR /usr/app

COPY ./src ./src
COPY ./test ./test
COPY ./tools ./tools

RUN deno run --allow-read --allow-write --allow-env --allow-run tools/compatibility/deno.ts

CMD ["tail", "-f", "/dev/null"]
