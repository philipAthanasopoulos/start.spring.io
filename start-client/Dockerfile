FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application for production
RUN yarn build

# Install serve to host static files
RUN yarn global add serve

# Expose port
EXPOSE 8080

# Change to start-client directory and serve built files
WORKDIR /app/start-client

ENTRYPOINT ["yarn","start"]
