# Build : docker build -t server .
# Run : docker run -p 3310:3310 server

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3310
CMD ["npm", "run", "dev"]
