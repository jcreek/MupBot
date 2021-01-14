FROM node:14-alpine
ENV NODE_ENV=production

# Create the directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy the package.json and install the packages
COPY package.json /usr/src/bot
RUN npm install

# Copy the bot itself
COPY . /usr/src/bot

# Start the bot
CMD ["node", "index.js"]
