# Loyihani Ishga Tushirish va Joylashtirish

## Mahalliy Rivojlantirish

### 1. Development Serverini Boshlash

```bash
npm run dev
```

Server `http://localhost:3000` da ishga tushadi.

### 2. Foydalanuvchi Hisobiga Kirish (Test uchun)

**Email:** admin@example.com  
**Parol:** password

```bash
OR

**Email:** teacher@example.com  
**Parol:** password
```

## Production Build

### 1. Build Yaratish

```bash
npm run build
```

### 2. Production Serverini Ishga Tushirish

```bash
npm start
```

## Docker-da Joylashtirish

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/kahoot_clone
      - NEXTAUTH_SECRET=your-secret-key
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=kahoot_clone
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Ishga Tushirish

```bash
docker-compose up -d
```

## Vercel-da Joylashtirish

### 1. Vercel CLI o'rnatish

```bash
npm install -g vercel
```

### 2. Loyihani Joylashtirish

```bash
vercel
```

### 3. Environment O'zgaruvchilarini o'rnatish

Vercel Dashboard-da:
- Project Settings → Environment Variables
- Quyidagi o'zgaruvchilarni qo'shing:

```
DATABASE_URL=your_postgresql_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=your_vercel_url
GEMINI_API_KEY=your_gemini_key
```

## Railway-da Joylashtirish

### 1. Railway-ga Ulanish

https://railway.app dan ro'yxatdan o'ting

### 2. Yangi Loyiha Yaratish

```bash
railway init
```

### 3. Environment O'zgaruvchilarini o'rnatish

```bash
railway variables set DATABASE_URL=your_url
railway variables set NEXTAUTH_SECRET=your_secret
```

### 4. Joylashtirish

```bash
railway up
```

## PostgreSQL-ni Sozlash

### Mahalliy

```bash
# PostgreSQL o'rnatish (Windows)
# https://www.postgresql.org/download/windows/

# Database yaratish
createdb kahoot_clone

# Prisma migratsiyalarini bajarish
npx prisma migrate dev --name init
```

### Cloud-da (Railway, Heroku, Supabase)

1. PostgreSQL service yaratish
2. CONNECTION STRING olish
3. `.env.local` ga kiritish

```
DATABASE_URL=postgresql://user:password@host:5432/kahoot_clone
```

## Monitoring va Logs

### Development

```bash
npm run dev -- --debug
```

### Errors tekshirish

```bash
# TypeScript errors
npm run type-check

# Linting
npm run lint
```

## Xavfsizlik Tekshiruvi

### Dependencies Tekshirish

```bash
npm audit
npm audit fix
```

### Environment Tekshirish

- [ ] `.env.local` `.gitignore` da
- [ ] API keys va secrets to'g'ri sozlangan
- [ ] HTTPS enabled (production)
- [ ] CORS configured
- [ ] Rate limiting enabled

## Performance Optimization

### Analytics

```bash
npm run build -- --analyze
```

### Image Optimization

Already handled by Next.js Image component

### Caching

- Static pages cached at build time
- Dynamic content cached with ISR (Incremental Static Regeneration)

## Backup va Recovery

### Database Backup

```bash
# PostgreSQL backup
pg_dump kahoot_clone > backup.sql

# Restore
psql kahoot_clone < backup.sql
```

### Environment Backup

- `.env.local` ni xavfsiz joyga saqlang
- Secrets manager ishlatib koʻring

## Troubleshooting

### Database Connection Xatosi

```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
npx prisma db pull
```

### Build Xatosi

```bash
# Clean and rebuild
rm -rf .next
npm run build
```

### API Errors

- Browser DevTools → Network tab
- Server logs: `npm run dev`
- Database logs: Check PostgreSQL logs

## Ishchilar va Tasks

### GitHub Actions CI/CD

`.github/workflows/deploy.yml` faylini yarating:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

## Qo'llab-quvvatlash

Xatoliklar yoki savollar uchun:
- GitHub Issues
- Email: support@example.com
- Discord: https://discord.gg/example
