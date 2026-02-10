#!/bin/bash

echo "Installing Laravel Backend..."

cd backend

echo "Installing Composer dependencies..."
composer install

echo "Copying .env file..."
cp .env.example .env

echo "Generating app key..."
php artisan key:generate

echo "Running migrations..."
php artisan migrate

echo "Seeding database..."
php artisan db:seed

echo "Backend setup complete!"
echo "Run 'php artisan serve' to start the server"
