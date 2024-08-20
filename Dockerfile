FROM node:lts-slim
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npm run dev"]