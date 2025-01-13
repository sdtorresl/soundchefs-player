FROM node:alpine AS build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli 

RUN npm run build --prod

RUN ls

FROM nginx:alpine

COPY --from=build /usr/src/app/dist/soundchefs-player/browser /usr/share/nginx/html

# Expose the port for the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]