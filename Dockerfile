FROM node:8

WORKDIR /usr/src/docker-react-sample

COPY package*.json ./
RUN npm install
RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD serve build -l 3000