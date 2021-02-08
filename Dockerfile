FROM node:15.7.0

WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3001
ENV MONGODBURL='mongodb://database/sdc-overview'
ENTRYPOINT ["node", "server", "3001"]
