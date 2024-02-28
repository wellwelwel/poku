FROM oven/bun:alpine

WORKDIR /usr/app

COPY ./build ./build
COPY ./server.ts ./server.ts

RUN mkdir -p ./build/assets/json
RUN bun add -d poku \
  && tar -czf node_modules.tar.gz node_modules \
  && echo "{\"size\": $(tar -tvf node_modules.tar.gz | awk '{sum += $3} END {print sum}')}" > ./build/assets/json/size.json \
  && rm -rf node_modules.tar.gz node_modules package.json bun.lockb \
  ;

CMD ["bun", "server.ts"]
