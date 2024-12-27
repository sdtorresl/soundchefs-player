FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm run build --prod

FROM nginx:alpine

COPY /dist/soundchefs-player/browser /usr/share/nginx/html

# Expose the port for the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]