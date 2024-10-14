FROM node:lts-alpine

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

EXPOSE 3030