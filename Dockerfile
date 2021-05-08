#Specify a base image
FROM node:latest

WORKDIR /opt/backend

#Install some dependencies
COPY ./package.json ./
# The above checks first if there is a change in package.json and then runs npm install. If there is no change(s), it picks the instructions from the cache
RUN npm install
RUN npm install pm2 -g

COPY ./ ./

#Default Command
CMD ["pm2-runtime", "app.js"]
 