FROM node:20-alpine

WORKDIR /app/react-app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE ${FRONTEND_PORT}

CMD ["sh", "-c", "if [ \"${ENV}\" = dev ]; then npx next dev --turbopack -p ${FRONTEND_PORT}; else npx next build; npx next start -p ${FRONTEND_PORT}; fi;"]
