# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY package*.json ./

# Install any needed packages specified in package*.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port 3004 available to the world outside this container
EXPOSE 8006

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["node", "server.js"]
