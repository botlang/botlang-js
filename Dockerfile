FROM node:alpine
MAINTAINER Mathias Schilling <m@matchilling.com>

ENV APP_PATH /opt/botlang

# Install bash
RUN apk add --update bash && rm -rf /var/cache/apk/*

# Create app directory
RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH

# Install app dependencies
COPY package.json $APP_PATH
RUN npm install

# Bundle app source
COPY . $APP_PATH

CMD ["npm", "run", "test"]
