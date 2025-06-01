FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY yamljs.d.ts ./

CMD ["npm", "run", "dev"]