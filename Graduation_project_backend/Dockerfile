FROM node:21-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --save-dev ts-node typescript

RUN npm i

COPY . .

# to be removed for docker compose 
RUN npx prisma generate

EXPOSE 3000

CMD [ "sh", "start.sh" ]
