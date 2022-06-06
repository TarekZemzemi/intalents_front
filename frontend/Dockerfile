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

# 80 for HTTP
EXPOSE 80

# run as non root user to avoid hacks
#RUN addgroup --system spring && adduser --system spring --ingroup spring
#
## permission on /opt from root to spring user
#RUN chown -R spring:spring /usr/share/nginx/html
#RUN chmod 777 /usr/share/nginx/html
#
## select user to run with
#USER spring:spring

# Run nginx
CMD nginx -g 'daemon off;'
