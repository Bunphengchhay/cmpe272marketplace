# Use the official PHP image as the base image
FROM php:8.1-apache

# Set the working directory in the container
WORKDIR /var/www/html

# Copy the current directory contents into the container at /var/www/html
COPY . /var/www/html

# Install mysqli extension
RUN docker-php-ext-install mysqli

# Enable Apache rewrite module
RUN a2enmod rewrite

# Expose port 80 to allow outside connections to your web server
EXPOSE 80

# Start Apache web server when the container starts
CMD ["apache2-foreground"]

