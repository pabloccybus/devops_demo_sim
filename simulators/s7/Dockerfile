FROM node:16.0.0-alpine3.13

WORKDIR /app
COPY . /app

RUN apk update && apk add python3 make g++
RUN npm install

ENTRYPOINT ["npm"]
CMD ["start"]