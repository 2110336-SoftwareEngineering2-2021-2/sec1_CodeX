FROM node:lts-alpine

WORKDIR /app
COPY ./apps/tuto-real-frontend/src .
COPY ./dist/apps/tuto-real-frontend .
COPY ./apps/tuto-real-frontend/package.json .
ENV PORT=4200
EXPOSE ${PORT}

RUN npm install --legacy-peer-deps

RUN npm install reflect-metadata tslib rxjs hbs
CMD node main.tsx
