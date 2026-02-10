Laravel Login UI Backend

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # API Controllers
│   │   ├── Middleware/        # Custom Middleware
│   │   └── Requests/          # Form Requests
│   ├── Models/               # Eloquent Models
│   └── Exceptions/           # Custom Exceptions
├── bootstrap/
│   └── app.php              # Application Bootstrap
├── config/                  # Configuration Files
├── database/
│   ├── migrations/          # Database Migrations
│   └── seeders/             # Database Seeders
├── routes/
│   └── api.php              # API Routes
├── storage/                 # Application Storage
├── artisan                  # Artisan CLI
└── composer.json            # PHP Dependencies
```

## Quick Start

1. **Install dependencies:**
   ```bash
   composer install
   ```

2. **Setup environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database setup:**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

4. **Run server:**
   ```bash
   php artisan serve
   ```

## API Endpoints

See the full API documentation in the routes/api.php file.

### Authentication Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/user`

## Database Tables

- `users` - User accounts with roles
- `personal_access_tokens` - API tokens (Sanctum)

## Environment Variables

Key configurations in `.env`:
- `DB_CONNECTION` - Database type
- `DB_DATABASE` - Database name
- `CORS_ALLOWED_ORIGINS` - Frontend URL for CORS
- `SANCTUM_STATEFUL_DOMAINS` - Allowed domains
