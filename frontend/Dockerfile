# Step 1: Use the official Node.js image as the base image
FROM node:16-alpine as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire application code to the container
COPY . .

# Step 6: Build the React application
RUN npm run build

# Step 7: Use Nginx as the base image for serving the React app
FROM nginx:stable-alpine

# Step 8: Copy the built React app from the previous stage to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port on which the app will run
EXPOSE 80

# Step 10: Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
