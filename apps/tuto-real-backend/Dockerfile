FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/tuto-real-backend .

ENV PORT=3333
EXPOSE ${PORT}

RUN npm install --production
RUN npm install swagger-ui-express
# These are the dependencies that NestJs needs that aren’t explicitly 
# used in our applications.
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express
CMD node ./main.js