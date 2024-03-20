# Use an official Node runtime as a parent image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and the package lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Use nginx to serve the React app
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access it
# from the outside.
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
