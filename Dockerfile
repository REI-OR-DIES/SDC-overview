FROM node:14-alpine

WORKDIR /app
COPY package.json app/package.json
RUN npm install
COPY . /app
EXPOSE 3001
CMD ["node", "server", "3001"]
