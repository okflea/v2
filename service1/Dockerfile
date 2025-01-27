# Use an official Node.js image
FROM node:18-alpine

# Create app directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the service files
COPY . .

# Build TypeScript -> JavaScript
RUN npm run build

# Expose the service port
EXPOSE 3001

# Start the service
CMD ["npm", "start"]
