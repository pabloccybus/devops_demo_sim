FROM node:16.0.0-alpine3.13

WORKDIR /app
COPY . /app

RUN npm install

ENTRYPOINT ["npm"]
CMD ["start"]