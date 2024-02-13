FROM node:18.17.0-alpine
#FROM 637423419927.dkr.ecr.ap-south-1.amazonaws.com/node:16.15.1-alpine
ARG SVC
ARG ENVIRONMENT
RUN mkdir -p /app/
WORKDIR /app/
USER root
COPY ./$SVC/package.json  ./
COPY ./$SVC .
RUN npm install
#RUN npm install -g serve
RUN npm run build
COPY ./$SVC/launch.sh .
RUN chmod +x launch.sh
ENV parameters="$SVC $ENVIRONMENT"
ENTRYPOINT /app/launch.sh $parameters

