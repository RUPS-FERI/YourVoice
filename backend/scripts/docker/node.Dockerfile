FROM node:20-alpine

WORKDIR /app/rest-api

COPY package*.json .

RUN npm install

COPY . .

EXPOSE ${APP_PORT}

CMD ["sh", "-c", "npm install && if [ \"${ENV}\" = dev ]; then npm run start:dev; else npm start; fi"]