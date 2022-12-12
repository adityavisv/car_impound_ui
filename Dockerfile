From node:14

RUN npm install -g serve

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "build"]