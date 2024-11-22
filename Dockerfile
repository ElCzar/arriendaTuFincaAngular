FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli
RUN npm install

# Copy project files
COPY . .

# Make entry point executable
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 4200

ENTRYPOINT ["docker-entrypoint.sh"]