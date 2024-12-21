# Stage 1: Use Node.js for building the app
FROM node:20.9.0-alpine AS builder

# Set the working directory inside the container to /app
WORKDIR /app

# Copy only the package.json file to the working directory
COPY package*.json .

# Install npm dependencies based on the package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the production app
# CMD ["npm", "run", "build"]
RUN npm run build


# Stage 2: Use a lightweight Node.js image for serving
FROM node:20.9.0-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json /app/

# Install npm dependencies based on the package.json
RUN npm install --omit=dev

# Expose port 8000 to allow external access
EXPOSE 3000

# Run the production build using Node
CMD ["node", "dist/index.js"]

