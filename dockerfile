FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev","--", "--host", "0.0.0.0"]
