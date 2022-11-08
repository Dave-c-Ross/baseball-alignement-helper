FROM node:14.21.0

EXPOSE 3000

WORKDIR /usr/src/app
COPY ./src ./

RUN npm install

CMD [ "npm", "start" ]