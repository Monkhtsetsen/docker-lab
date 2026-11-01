
# 1. Use Node.js 24 as the base image
FROM node:24-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first
COPY package*.json ./

# 4. Install dependencies
RUN npm ci

# 5. Copy application source code
COPY app.js ./

# 6. Expose application port
EXPOSE 3000

# 7. Start the application
CMD ["npm", "start"]
