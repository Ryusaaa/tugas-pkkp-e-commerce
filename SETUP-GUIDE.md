# 📋 Panduan Setup Project - Electronics eCommerce Shop

Panduan lengkap untuk setup project Electronics eCommerce Shop baik di bagian Frontend (Next.js) maupun Backend (Node.js).

---

## 🔧 Prasyarat (Prerequisites)

Pastikan Anda sudah menginstall:

- **Node.js** (versi 18.0 atau lebih baru)
- **npm** atau **yarn** atau **bun**
- **MySQL** (versi 5.7 atau lebih baru)
- **Git**

Verifikasi instalasi:
```bash
node --version
npm --version
mysql --version
```

---

## 📁 Struktur Project

```
Electronics-eCommerce-Shop/
├── app/                    # Next.js App Router (Frontend)
├── components/             # React Components
├── hooks/                  # Custom React Hooks
├── lib/                    # Utility functions & configs
├── prisma/                 # Database schema & migrations
├── public/                 # Static assets
├── server/                 # Express.js Backend Server
├── types/                  # TypeScript type definitions
├── utils/                  # Helper functions
├── package.json            # Frontend dependencies
└── server/package.json     # Backend dependencies
```

---

## 🚀 Setup Frontend (Next.js)

### Step 1: Install Dependencies Frontend

```bash
# Masuk ke root directory project
cd Electronics-eCommerce-Shop-With-Admin-Dashboard-NextJS-NodeJS

# Install semua dependencies
npm install
# atau
yarn install
# atau
bun install
```

### Step 2: Konfigurasi Environment Variables (.env)

Buat file `.env.local` di root project:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/singitronic_db"

# Next.js & Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-randomly"

# API Configuration
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"

# Other configs (optional)
NEXT_PUBLIC_SITE_NAME="Singitronic Electronics"
```

**Cara generate `NEXTAUTH_SECRET`:**
```bash
openssl rand -base64 32
```

### Step 3: Setup Database dengan Prisma

```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push

# (Optional) Buka Prisma Studio untuk manage data
npm run db:studio
```

### Step 4: Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
# atau
bun dev
```

Server akan jalan di: **http://localhost:3000**

---

## 🖥️ Setup Backend (Express.js Server)

### Step 1: Masuk ke Folder Server

```bash
cd server
```

### Step 2: Install Dependencies Backend

```bash
npm install
# atau
yarn install
# atau
bun install
```

### Step 3: Konfigurasi Environment Variables (.env)

Buat file `.env` di folder `server/`:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/singitronic_db"

# CORS Settings
CORS_ORIGIN="http://localhost:3000"

# JWT/Auth (if needed)
JWT_SECRET="your-jwt-secret-key"

# Logging
LOG_LEVEL=info
```

### Step 4: Setup Database (jika belum dilakukan)

```bash
# Jika belum ada database, generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push
```

### Step 5: Jalankan Development Server

```bash
npm start
# atau untuk development dengan auto-reload
npm run dev
```

Server akan jalan di: **http://localhost:3001**

---

## 🗄️ Konfigurasi Database (MySQL)

### Membuat Database

```sql
-- Login ke MySQL
mysql -u root -p

-- Create database
CREATE DATABASE singitronic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (optional, lebih aman)
CREATE USER 'singitronic_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON singitronic_db.* TO 'singitronic_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

### Connection String Format

```
mysql://username:password@host:port/database_name
```

**Contoh:**
```
mysql://root:password@localhost:3306/singitronic_db
mysql://singitronic_user:your_password@localhost:3306/singitronic_db
```

---

## 📋 Available Scripts

### Frontend (Root Directory)

```bash
npm run dev           # Run development server
npm run build         # Build untuk production
npm start             # Start production server
npm run lint          # Run ESLint
npm run db:generate   # Generate Prisma Client
npm run db:push       # Push database schema
npm run db:studio     # Open Prisma Studio
```

### Backend (server/ Directory)

```bash
npm start             # Run Express server
npm run logs          # View application logs
npm run logs:access   # View access logs
npm run logs:error    # View error logs
npm run logs:security # View security logs
npm run logs:analyze  # Analyze logs
npm run db:backup     # Backup database
npm run db:restore    # Restore database
npm run migrate:safe  # Safe database migration
```

---

## 🔍 Verifikasi Setup

### Frontend Berjalan dengan Baik Jika:
- ✅ `npm run dev` berjalan tanpa error
- ✅ http://localhost:3000 dapat diakses
- ✅ Page loading dan responsive
- ✅ Tidak ada error di console browser

### Backend Berjalan dengan Baik Jika:
- ✅ `npm start` berjalan tanpa error di folder server/
- ✅ http://localhost:3001 accessible
- ✅ API endpoints respond dengan benar
- ✅ Database connection berhasil

### Database Berjalan dengan Baik Jika:
- ✅ MySQL service running
- ✅ Database `singitronic_db` tercipta
- ✅ Connection string valid di .env files
- ✅ Prisma can connect ke database

---

## 🐛 Troubleshooting

### Port Sudah Digunakan

```bash
# Cari process yang menggunakan port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Error

```bash
# Test MySQL connection
mysql -u username -p -h localhost -D singitronic_db

# Verify DATABASE_URL di .env
echo $DATABASE_URL
```

### Prisma Issues

```bash
# Clear Prisma cache
rm -rf node_modules/.prisma

# Regenerate
npm run db:generate

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Node Modules Issues

```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Conflict

Ubah port di `.env` atau konfigurasi server jika diperlukan:

```env
# Backend
PORT=3002  # ganti dari 3001

# Frontend (.env.local)
NEXT_PUBLIC_API_BASE_URL="http://localhost:3002"
```

---

## 📚 Struktur Folder Penting

### Frontend Components
- `app/` - Next.js pages & layouts
- `components/` - Reusable React components
- `hooks/` - Custom React hooks
- `lib/` - Configuration & utilities
- `types/` - TypeScript definitions

### Backend
- `server/controllers/` - Route controllers
- `server/logs/` - Application logs
- `server/migrations/` - Database migrations
- `server/app.js` - Main server file

### Database
- `prisma/schema.prisma` - Database schema definition
- `prisma/migrations/` - Schema change history

---

## 🔐 Security Notes

1. **Never commit .env files** - Selalu add ke .gitignore
2. **Generate unique secrets** - Gunakan random string untuk secrets
3. **Use strong passwords** - Untuk database user
4. **CORS configuration** - Configure sesuai environment
5. **Keep dependencies updated** - Regularly run `npm update`

---

## 📖 Next Steps Setelah Setup

1. ✅ Setup database dengan seed data (optional)
2. ✅ Test API endpoints menggunakan Postman/Thunder Client
3. ✅ Create admin user dengan command: `node server/createAdminUser.js`
4. ✅ Test authentication & login
5. ✅ Explore dashboard di http://localhost:3000/dashboard

---

## 📞 Help & Support

Untuk bantuan lebih lanjut:
1. Lihat file README.md di project root
2. Check dokumentasi bulk-upload jika diperlukan
3. Lihat logs di folder `server/logs/`
4. Check Prisma documentation: https://www.prisma.io/docs/

---

**Last Updated**: January 2026
**Project**: Electronics eCommerce Shop with Admin Dashboard
