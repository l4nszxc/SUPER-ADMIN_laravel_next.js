# Login UI - Full Stack Project

This project contains both a **Next.js Frontend** and **Laravel Backend** in a single folder structure.

## 📁 Project Structure

```
LOGIN UI USING NEXT.JS/
│
├── frontend/                   # Frontend - Next.js App
│   ├── app/                    # Next.js App Router
│   ├── components/             # React Components
│   ├── hooks/                  # Custom React Hooks
│   ├── lib/                    # Utility Functions
│   ├── public/                 # Static Files
│   ├── node_modules/           # Dependencies
│   ├── .next/                  # Build Output
│   ├── package.json            # Frontend Dependencies
│   ├── tsconfig.json          # TypeScript Config
│   ├── next.config.mjs        # Next.js Config
│   ├── tailwind.config.ts     # Tailwind Config
│   └── postcss.config.mjs     # PostCSS Config
│
└── backend/                    # Backend - Laravel API
    ├── app/                    # Application Code
    │   ├── Http/
    │   │   ├── Controllers/    # API Controllers
    │   │   ├── Middleware/     # Custom Middleware
    │   │   └── Requests/       # Form Requests
    │   └── Models/             # Eloquent Models
    │
    ├── bootstrap/              # Bootstrap Config
    ├── config/                 # Laravel Configurations
    ├── database/
    │   ├── migrations/         # Database Migrations
    │   └── seeders/            # Database Seeders
    ├── routes/
    │   └── api.php             # API Routes
    ├── storage/                # App Storage
    ├── public/                 # Static Files
    │
    ├── composer.json           # PHP Dependencies
    ├── .env.example            # Environment File Template
    └── README.md               # Backend Documentation
```

## 🚀 Getting Started

### Frontend (Next.js)

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

   Frontend runs on `http://localhost:3000`

### Backend (Laravel)

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Setup environment:**
   ```bash
   copy .env.example .env
   php artisan key:generate
   ```

4. **Configure database in `.env`:**
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=login_ui_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Run migrations:**
   ```bash
   php artisan migrate
   ```

6. **Seed sample data (optional):**
   ```bash
   php artisan db:seed
   ```

7. **Start development server:**
   ```bash
   php artisan serve
   ```

   Backend API runs on `http://localhost:8000`

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user *(requires token)* |
| GET | `/api/auth/user` | Get authenticated user *(requires token)* |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### Admin Routes *(requires token & admin role)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Admin dashboard |
| GET | `/api/admin/users` | List all users |
| PUT | `/api/admin/users/{id}` | Update user |
| DELETE | `/api/admin/users/{id}` | Delete user |

## 👥 Sample Accounts (After Seeding)

| Email | Password | Role |
|-------|----------|------|
| superadmin@example.com | password | Super Admin |
| admin@example.com | password | Admin |
| assistant@example.com | password | Admin Assistant |
| john@example.com | password | User |
| jane@example.com | password | User |

## 🔐 Authentication Method

- **Backend:** Laravel Sanctum for API token authentication
- **Frontend:** Store token in localStorage/sessionStorage
- **CORS:** Configured to allow requests from `http://localhost:3000`

## 🛠️ Tech Stack

### Frontend
- **Next.js 15+** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React Components** - Pre-built UI components

### Backend
- **Laravel 11** - PHP Framework
- **MySQL/MariaDB** - Database
- **Laravel Sanctum** - API Authentication
- **Eloquent ORM** - Database ORM

## 📝 Environment Variables

### Frontend (.env.local)
Create if needed for API base URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (.env)
Configure after copying from `.env.example`:
```
APP_NAME=LoginUIBackend
APP_KEY=base64:...
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=login_ui_db
DB_USERNAME=root
DB_PASSWORD=
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 📚 Additional Resources

- [Backend Documentation](./backend/README.md)
- [Backend Setup Guide](./BACKEND_SETUP.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)

## 💡 Development Tips

1. **Keep both servers running** during development in separate terminals:
   - **Frontend:** `cd frontend && npm run dev` (port 3000)
   - **Backend:** `cd backend && php artisan serve` (port 8000)

2. **Check CORS settings** if requests fail from frontend to backend

3. **Frontend Environment:** Create `frontend/.env.local` for API configuration
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Use Laravel Tinker** for quick database checks:
   ```bash
   cd backend
   php artisan tinker
   ```

5. **Monitor Laravel logs**:
   ```bash
   cd backend
   tail -f storage/logs/laravel.log
   ```

---

**Happy Coding! 👨‍💻👩‍💻**
