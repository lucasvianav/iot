FROM node:16

WORKDIR /home/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copies both package.json
# and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install --silent

# copies the project files
COPY . .

# binds the port
EXPOSE ${PORT}

CMD [ "npm", "start" ]
