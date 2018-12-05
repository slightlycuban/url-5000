FROM node:10-alpine

ARG MONGO_HOST=mongo
ENV MONGO_URL=mongodb://${MONGO_HOST}:27017 \
    PORT=80
EXPOSE ${PORT}

WORKDIR /opt/short
COPY . .
RUN npm ci --production --prune

CMD [ "node", "server.js" ]
