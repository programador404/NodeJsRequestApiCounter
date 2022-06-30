FROM node:16.15.1-alpine AS build

WORKDIR /build
COPY ./src ./src
COPY [ "package.json", "package-lock.json", "tsconfig.json", "./" ]
RUN npm install --no-progress && \
    npm run build

FROM node:16.15.1-alpine AS dependencies

ENV NODE_ENV=production
WORKDIR /build
COPY [ "package.json", "package-lock.json", "tsconfig.json", "./" ]
RUN npm install --production=true --no-progress

FROM node:16.15.1-alpine

ENV NODE_ENV=production
WORKDIR /app
COPY --from=dependencies /build/node_modules /app/node_modules
COPY --from=build /build/dist /app/dist
COPY ./docker-entrypoint.sh ./docker-entrypoint.sh

ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["node", "dist/server.js"]
