FROM node:15.7.0

WORKDIR /sdc_overview
COPY . .
RUN npm install
EXPOSE 3001
CMD ["node", "server/index.js"]
