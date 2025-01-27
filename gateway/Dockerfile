# Start from an official NGINX image
FROM nginx:alpine

# Remove default NGINX config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx.conf to the container
COPY nginx.conf /etc/nginx/nginx.conf
