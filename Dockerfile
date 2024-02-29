# This is a multi-stage docker image
# The build-stage will be responsible for the creation of the build artifact and the production stage will be the actual image running in production using NgInx

# Using Alpine for better performance and being a lean image
FROM node:21-alpine as build-stage

WORKDIR /app

# First copy only yarn.lock, this way we will ensure the build will be faster when there is no update in package.json
COPY package.json yarn.lock ./

# the most time consuming layer of the image
RUN yarn install

# Now we can copy the rest of the files
COPY . .

RUN yarn build


FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]