## Backend Setup

### Prerequisites
- PHP 8.2 or higher
- Composer
- MySQL/MariaDB

### Installation

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Create environment file:
   ```bash
   copy .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Configure your database in `.env`, then run migrations:
   ```bash
   php artisan migrate
   ```

6. Seed sample data (optional):
   ```bash
   php artisan db:seed
   ```

7. Start the development server:
   ```bash
   php artisan serve
   ```

The backend API will be available at `http://localhost:8000`

### Frontend & Backend Structure

```
MY PROJECTS/LOGIN UI USING NEXT.JS/
├── (Next.js Frontend)
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
└── backend/ (Laravel API)
    ├── app/
    ├── config/
    ├── database/
    ├── routes/
    ├── storage/
    └── composer.json
```

### CORS Configuration

The backend is already configured for CORS with the frontend. Update `CORS_ALLOWED_ORIGINS` in `.env` to match your frontend URL:
```
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Database Credentials (for development)

Default seeded accounts:
- Super Admin: `superadmin@example.com` / `password`
- Admin: `admin@example.com` / `password`
- Admin Assistant: `assistant@example.com` / `password`
- User: `john@example.com` / `password`
