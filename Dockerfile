FROM node:20-alpine AS builder

WORKDIR /app

ARG PUBLIC_CLOUDINARY_CLOUD_NAME
ARG PUBLIC_CLOUDINARY_CAROUSEL_TAG
ENV PUBLIC_CLOUDINARY_CLOUD_NAME=${PUBLIC_CLOUDINARY_CLOUD_NAME}
ENV PUBLIC_CLOUDINARY_CAROUSEL_TAG=${PUBLIC_CLOUDINARY_CAROUSEL_TAG}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build 

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]