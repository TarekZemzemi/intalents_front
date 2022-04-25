#FROM node:14.17.3-alpine3.11
#
#RUN mkdir /app && chown node:node /app
#
#USER node
#
#WORKDIR /app
#
#COPY --chown=node:node . .
#
#RUN npm ci && npm run build
#
#ENV PATH /app/node_modules/.bin:$PATH
#
#CMD ["npm","run","start"]

# The first image is for compiling the client files, the second is for serving.

#################################################################
#################################################################
#################################################################
# BUILD IMAGE
FROM node:12.19.0-alpine3.11 as build-stage

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build
COPY . .
RUN npm run build

# -----------------------------------------------------------------------------
# SERVING IMAGE
FROM fitiavana07/nginx-react

# Copy built files
COPY --from=build-stage /app/build /usr/share/nginx/html

# copy custom nginx conf (fix for 405 error when posting to backend)
COPY nginx-docker.conf /etc/nginx/nginx.conf

# 80 for HTTP
EXPOSE 80

# Run nginx
CMD nginx -g 'daemon off;'
