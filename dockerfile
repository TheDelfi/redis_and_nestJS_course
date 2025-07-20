FROM node:latest
WORKDIR /app
COPY . .
EXPOSE 3000
ENTRYPOINT [ "node", "start" ]