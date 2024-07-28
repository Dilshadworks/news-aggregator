# Stage 1: Build the React application
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the React application
RUN yarn build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built files from the previous stage to the Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]