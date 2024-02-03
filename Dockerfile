FROM node:16.15.0-alpine as builder

ENV NPM_CONFIG_LOGLEVEL warn

#WORKDIR /app
#COPY . /app/
#RUN apk update && apk add python3 make g++

#RUN yarn install
#RUN yarn build || echo 1
#ENTRYPOINT npm run start

#FROM 144258099647.dkr.ecr.ap-south-1.amazonaws.com/node:14.13.1-alpine
#FROM node:14.13.1
ARG SVC
ARG ENVIRONMENT
RUN mkdir -p /app/
WORKDIR /app/
USER root
COPY ./$SVC/package.json  ./
COPY ./$SVC .
RUN npm install --force
#RUN npm run build:universal:prod
RUN npm run build
COPY ./$SVC/launch.sh .
RUN chmod +x launch.sh
ENV parameters="$SVC $ENVIRONMENT"
ENTRYPOINT npm run start
