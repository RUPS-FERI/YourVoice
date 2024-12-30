FROM node:20-alpine

WORKDIR /app/react-app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE ${FRONTEND_PORT}

CMD ["sh", "-c", "if [ \"${ENV}\" = dev ]; then npm run start:dev; else npm start; fi;"]
