FROM node:8.6.0-alpine

# Create app directory
WORKDIR usr/src/app

# Install app dependencies
COPY package.json .

# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

RUN npm install

# Bundle UI source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
