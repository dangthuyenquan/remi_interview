
FROM node:18-alpine3.17

ENV CODE_DIR=./src/api

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY ${CODE_DIR} /var/www/app

COPY  ${CODE_DIR}/package*.json /var/www/app

RUN  mv .env.example .env

RUN npm install

RUN npm i -g pm2

EXPOSE 3500

CMD [ "pm2","start","server.js","--no-daemon" ]
