# Laravel Backend - Login UI

This is the backend API for the Login UI project built with Laravel 11.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   composer install
   ```

2. **Setup Environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Setup**
   - Update `.env` with your database credentials
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

4. **Run Development Server**
   ```bash
   php artisan serve
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (requires token)
- `GET /api/auth/user` - Get authenticated user (requires token)
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Admin Routes (requires token & admin role)
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{id}` - Delete user

## Database Seeders

Run `php artisan db:seed` to populate sample data:
- Super Admin: superadmin@example.com / password
- Admin: admin@example.com / password
- Admin Assistant: assistant@example.com / password
- Users: john@example.com, jane@example.com / password

## CORS Configuration

CORS is enabled for the frontend at `http://localhost:3000`. Update `CORS_ALLOWED_ORIGINS` in `.env` if needed.
