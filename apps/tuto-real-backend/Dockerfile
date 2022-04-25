FROM node:lts-alpine AS build
WORKDIR /build

COPY package*.json ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build:backend

RUN yarn install --frozen-lockfile --production --ignore-scripts --prefer-offline

# COPY ./dist/apps/tuto-real-backend ./
# COPY ./apps/tuto-real-backend .
# FROM node:lts-alpine AS base

FROM node:lts-alpine AS base
WORKDIR /app

COPY --from=build /build/dist/apps/tuto-real-backend dist
# COPY /apps/tuto-real-backend ./
COPY --from=build /build/node_modules node_modules

ENV PORT=3333
EXPOSE ${PORT}

# RUN npm install --production
# dependencies that nestjs needs
# RUN npm install reflect-metadata tslib rxjs @nestjs
# RUN npm install

# CMD nx run tuto-real-backend:serve
CMD node ./dist/main.js
# CMD node src/src/main.ts