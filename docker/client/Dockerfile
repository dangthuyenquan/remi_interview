FROM node:17.5-slim as builder

# Prepare environment
ENV CODE_DIR=./src/frontend
#ARG APP_ENV
ARG VITE_APP_API_URL
ARG VITE_SOCKET_SHARE_VIDEO_APP_URL

WORKDIR /var/www/app
COPY ${CODE_DIR} /var/www/app

RUN  mv .env.example .env

# Installing libs and build
# RUN mv -f package.json package.json
RUN npm install
RUN npm run build



FROM nginx:stable

# Prepare environment
WORKDIR /var/www/app
COPY --from=builder --chown=www-data:www-data /var/www/app/dist /var/www/app
COPY ./docker/client/files /root/files

RUN cp -rp /root/files/nginx.conf /etc/nginx/nginx.conf \
  && cp -rp /root/files/default.conf /etc/nginx/conf.d/default.conf \
  && chown -R www-data:www-data /var/www/app

EXPOSE 80 443
CMD [ "nginx" ]