# Build stage
FROM node:lts-alpine AS build

ENV TZ=Europe/Zurich

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine

ENV TZ=Europe/Zurich

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && date

EXPOSE 80
