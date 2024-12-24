# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve the build files
# Use nginx as a base image
FROM nginx:stable-alpine

# Copy the build files from the previous stage to the nginx html directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
