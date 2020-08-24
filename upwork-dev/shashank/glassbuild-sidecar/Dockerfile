FROM node:10.14.2

WORKDIR /app

COPY package*.json ./

# RUN npm install -g pm2

RUN npm install

COPY . .


CMD ["node", "app.js"]
