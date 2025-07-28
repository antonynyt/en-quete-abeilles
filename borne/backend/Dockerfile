FROM node:lts-alpine

# Install dependencies for serial port communication and native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    linux-headers \
    udev \
    libc6-compat

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run" , "dev"]