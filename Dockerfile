From node

ENV NODE_ENV local
RUN npm install -g http-server

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .
COPY ./custom ./src/assets/custom

EXPOSE 8080
ENTRYPOINT ["/bin/sh", "-c" , "npm run build && http-server dist"]