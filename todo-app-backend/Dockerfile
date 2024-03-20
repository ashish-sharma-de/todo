# Use the official Node.js 16 image as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

RUN npm config rm registry || true

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm config set registry https://registry.npmjs.org/
RUN npm config list # This shows the npm configuration

RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:prod"]
