# Use a base image with Node.js pre-installed
FROM node:14 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run tests
RUN npm run test

# Build the application
RUN npm run build

# Second stage - use a smaller image for production
FROM node:14-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built application from the builder stage
COPY --from=builder /app/build ./build

# Expose port 3000
EXPOSE 3000

# Set environment variables if needed
ENV NODE_ENV=production

# Command to run the application
CMD [ "node", "dist/index.js" ]
