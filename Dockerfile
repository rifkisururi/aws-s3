FROM node:18.6-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD [ "npm", "start" ]