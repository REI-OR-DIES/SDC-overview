FROM node:14-alpine

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
EXPOSE 3001
ENTRYPOINT ["node", "server", "3001"]
